import { LoadConfig, ApiError, NyTimesApi } from '../../api/typings';
import React, { useState, useEffect, memo } from 'react';
import { processApiResult, loadMore } from '../../api/infiniteLoadingLogic';

/**
 * I had to refactor the component so it does render-to-props
 * instead. Home and BestSeller share the logic between them.
 */

type ApiCall = () => Promise<
  | NyTimesApi
  | {
      error: {
        msg: string;
      };
    }
>;

type ApiProps = {
  userLoadConfig: LoadConfig;
  apiCall: ApiCall;
  render(
    loading: boolean,
    loadConfig: LoadConfig,
    fetchMore: () => void,
  ): JSX.Element;
};

function Api(props: ApiProps) {
  const [loading, setLoading] = useState(true);

  const [loadConfig, setLoadConfig] = useState<LoadConfig>(
    props.userLoadConfig,
  );

  useEffect(() => {
    async function fetchData() {
      const topBooks = await props.apiCall();
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

  return props.render(loading, loadConfig, fetchMore);
}

export default memo(Api);
