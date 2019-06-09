import React, { memo, useState, useEffect, useMemo } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import {
  NyTimesBestSellerResult,
  LoadConfig,
  ApiError,
  NyTimesApi,
} from '../../api/typings';
import { List } from 'immutable';
import { processApiResult, loadMore } from '../../api/infiniteLoadingLogic';
import { Card, Loading, Grid, Error } from '../../components';
import { getCurrentTopBooksByListName } from '../../api/data';
import InfiniteScroll from 'react-infinite-scroller';

/**
 * After the user clicks on a card, he'll be presented with the best seller
 * type he found.
 */

type BestSellerRouteProp = {
  listNameEncoded?: string;
};

function BestSeller(props: RouteComponentProps<BestSellerRouteProp>) {
  const [loading, setLoading] = useState(true);
  const [loadConfig, setLoadConfig] = useState<LoadConfig>({
    toDisplay: 6,
    itemsShown: [],
    itemsNotShown: [],
    allItems: List<NyTimesBestSellerResult>(),
    hasMore: true,
    fetchMore: true,
  });

  // Let's call the API.
  useEffect(() => {
    async function fetchData() {
      const topBooks = await getCurrentTopBooksByListName(
        props.listNameEncoded!,
      );
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
      const bestSeller = allItems.get(bestSellerName)!;
      const onClick = () => {
        navigate(`/${bestSeller.list_name_encoded}`);
      };
      return (
        <Card
          onClick={onClick}
          key={bestSeller!.list_name}
          title={bestSeller!.display_name}
          imgSrc={'https://s1.nyt.com/du/books/images/9780062861214.jpg'}
        />
      );
    });
  }, [loadConfig]);

  if (loading) return <Loading />;
  if (!!loadConfig.errorMsg) return <Error msg={loadConfig.errorMsg!} />;

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

export default memo(BestSeller);
