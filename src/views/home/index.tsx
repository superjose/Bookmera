import React, { memo, useState, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { getCurrentTopBooks as getBestSellerListNames } from '../../api/data';

import { Error, Loading, Card, Grid } from '../../components';
import {
  ApiError,
  NyTimesNameResult,
  NyTimesApi,
  InfiniteScrollingState,
} from '../../api/typings';
import { List } from 'immutable';
import { processApiResult, loadMore } from '../../api/infiniteLoadingLogic';

interface HomeLoadConfig extends InfiniteScrollingState {
  hasMore: boolean;
  fetchMore: boolean;
  error?: string;
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [loadConfig, setLoadConfig] = useState<HomeLoadConfig>({
    toDisplay: 6,
    itemsShown: [],
    itemsNotShown: [],
    allItems: List<NyTimesNameResult>(),
    hasMore: true,
    fetchMore: true,
  });

  // Let's call the API.
  useEffect(() => {
    async function fetchData() {
      const topBooks = await getBestSellerListNames();
      const infiniteState = { ...loadConfig };

      if (!!(topBooks as ApiError).error) {
        setLoadConfig({
          ...infiniteState,
          error: (topBooks as ApiError).error.msg,
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
        error: '',
        hasMore,
        fetchMore,
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

  const bestSellerCards = useMemo(() => {
    const { allItems } = loadConfig;
    return loadConfig.itemsShown.map(bestSellerName => {
      const bestSeller = allItems.get(bestSellerName);
      return (
        <Card
          key={bestSeller!.list_name}
          title={bestSeller!.display_name}
          imgSrc={'https://s1.nyt.com/du/books/images/9780062861214.jpg'}
        />
      );
    });
  }, [loadConfig]);

  if (loading) return <Loading />;
  console.log(bestSellerCards);
  console.log(loadConfig);
  console.log(!loadConfig.error);
  if (!!loadConfig.error) return <Error msg={loadConfig.error!} />;

  return (
    <Grid>
      <InfiniteScroll
        pageStart={0}
        hasMore={loadConfig.hasMore}
        loadMore={fetchMore}
      >
        {bestSellerCards}
      </InfiniteScroll>
    </Grid>
  );
}

export default memo(Home);
