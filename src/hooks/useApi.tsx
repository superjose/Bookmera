import { NyTimesApi, LoadConfig, ApiError } from '../api/typings';
import { useEffect, useState } from 'react';
import { processApiResult, loadMore } from '../api/infiniteLoadingLogic';

type ApiCall = () => Promise<
  | NyTimesApi
  | {
      error: {
        msg: string;
      };
    }
>;
export function useApi(apiCall: ApiCall, userLoadConfig: LoadConfig) {
  const displayToWatch = window.matchMedia('(min-width:640px)');
  /**
   * We load the useState from the main component.
   * We override the toDisplay to detect the window size.
   */
  const [loadConfig, setLoadConfig] = useState<LoadConfig>({
    ...userLoadConfig,
    toDisplay: displayToWatch.matches ? 6 : 3,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const topBooks = await apiCall();
      const infiniteState = { ...loadConfig };

      if (!!(topBooks as ApiError).error) {
        setLoadConfig({
          ...infiniteState,
          errorMsg: (topBooks as ApiError).error.msg,
        });
        return;
      }

      const { allItems, itemsShown, itemsNotShown } = processApiResult(
        topBooks as NyTimesApi,
        infiniteState,
      );

      const hasMore = itemsNotShown.length > 0;

      setLoadConfig({
        ...loadConfig,
        errorMsg: '',
        hasMore,
        allItems,
        itemsShown,
        itemsNotShown,
      });

      setLoading(false);
    }
    fetchData();
    // This must only be executed once; disable the linter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Since the site is responsive, changing orientations or resizing the window will need to have the
   * displayTo property adjusted, so it loads the items as they need to.
   */
  function setToDisplayAccordingToSize(
    this: MediaQueryList,
    displayToWatch: MediaQueryListEvent,
  ) {
    const isDesktop = displayToWatch.matches;

    if (
      (loadConfig.toDisplay === 6 && isDesktop) ||
      (loadConfig.toDisplay === 3 && !isDesktop)
    )
      return;

    setLoadConfig({
      ...loadConfig,
      toDisplay: isDesktop ? 6 : 3,
    });
  }

  useEffect(() => {
    displayToWatch.addListener(setToDisplayAccordingToSize);
    return () => {
      displayToWatch.removeListener(setToDisplayAccordingToSize);
    };
  });

  function fetchMore() {
    const infiniteState = { ...loadConfig };
    const { allItems, itemsShown, itemsNotShown } = loadMore(infiniteState);

    const hasMore = itemsNotShown.length > 0;

    setLoadConfig({
      ...loadConfig,
      hasMore,
      itemsShown,
      itemsNotShown,
      allItems,
    });
  }

  return { loadConfig, loading, fetchMore };
}
