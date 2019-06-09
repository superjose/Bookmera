import {
  NyTimesApi,
  LoadConfig,
  NyTimesNameResult,
  NyTimesBestSellerResult,
  ApiError,
} from '../api/typings';
import { useEffect, useState } from 'react';
import { List } from 'immutable';
import { processApiResult } from '../api/infiniteLoadingLogic';

type ApiCall = () => Promise<
  | NyTimesApi
  | {
      error: {
        msg: string;
      };
    }
>;

export function useApi(apiCall: ApiCall) {
  const [loadConfig, setLoadConfig] = useState<LoadConfig>({
    toDisplay: 6,
    itemsShown: [],
    itemsNotShown: [],
    allItems: List<NyTimesNameResult | NyTimesBestSellerResult>(),
    hasMore: true,
    fetchMore: true,
  });

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

      const fetchMore = (topBooks as NyTimesApi).num_results <= 20;

      const { allItems, itemsShown, itemsNotShown } = processApiResult(
        topBooks as NyTimesApi,
        infiniteState,
      );

      const hasMore = fetchMore || (!fetchMore && itemsNotShown.length > 0);

      setLoadConfig({
        ...loadConfig,
        errorMsg: '',
        hasMore,
        fetchMore,
        allItems,
        itemsShown,
        itemsNotShown,
      });

      //   setLoading(false);
    }
    fetchData();
  }, []);
}
