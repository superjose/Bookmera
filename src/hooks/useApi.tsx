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
  const [loadConfig, setLoadConfig] = useState<LoadConfig>(userLoadConfig);
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
