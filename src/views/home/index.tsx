import React, { memo, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { getCurrentTopBooks as getBestSellerListNames } from '../../api/data';

import { Loading, Card, Grid } from '../../components';
import { NyTimesNameResult } from '../../api/typings';
import { List } from 'immutable';
import { RouteComponentProps, navigate } from '@reach/router';
import { useApi } from '../../hooks/useApi';
import { H1Padded } from '../../components/styles/h1Padded';
import { BottomReached } from '../../components/styles/BottomReached';

function Home(props: RouteComponentProps) {
  const initialLoadConfig = {
    toDisplay: 6,
    itemsShown: [],
    itemsNotShown: [],
    allItems: List<NyTimesNameResult>(),
    hasMore: true,
  };
  const { loadConfig, loading, fetchMore } = useApi(
    getBestSellerListNames,
    initialLoadConfig,
  );

  const bestSellerCards = useMemo(() => {
    const { allItems } = loadConfig;
    return loadConfig.itemsShown.map(bestSellerName => {
      const bestSeller = allItems.get(bestSellerName) as NyTimesNameResult;
      const onClick = () => {
        navigate(`/${bestSeller.list_name_encoded}`);
      };
      return (
        <Card
          onClick={onClick}
          key={bestSeller!.list_name}
          title={bestSeller!.display_name}
          imgSrc={'https://s1.nyt.com/du/books/images/9780062861214.jpg'}
          buttonLabel="View More"
          uniqueId="This isn\'t likeable so it doesn't matter what we put here"
        />
      );
    });
  }, [loadConfig]);

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && !loadConfig.errorMsg && (
        <React.Fragment>
          <br />
          <H1Padded>Best Seller Categories</H1Padded>
          <InfiniteScroll
            pageStart={0}
            hasMore={loadConfig.hasMore}
            loadMore={fetchMore}
          >
            <Grid>{bestSellerCards}</Grid>
            {!loadConfig.hasMore && (
              <BottomReached>👋 You've reached the end ! </BottomReached>
            )}
          </InfiniteScroll>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default memo(Home);
