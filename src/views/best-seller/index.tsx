import React, { memo, useState, useEffect, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import InfiniteScroll from 'react-infinite-scroller';
import { LoadConfig, Book, Name } from '../../api/typings';
import { List } from 'immutable';
import { loadMore } from '../../api/infiniteLoadingLogic';
import { Card, Loading, Grid, Error } from '../../components';
import { getCurrentTopBooksByListName } from '../../api/data';
import BuyNow from './buy-now';
import { BuyNowProps } from './buy-now/index';
import { findStoreUrl } from '../../api/utils';
import { useApi } from '../../hooks/useApi';

/**
 * After the user clicks on a card, he'll be presented with the best seller
 * type he found.
 */

type BestSellerRouteProp = {
  listNameEncoded?: string;
};

enum ModalState {
  'Opened',
  'Closed',
}

function BestSeller(props: RouteComponentProps<BestSellerRouteProp>) {
  const [modalState, setModalState] = useState<ModalState>(ModalState.Closed);
  const [buyNowProps, setBuyNowProps] = useState<BuyNowProps>({
    bookCoverImgUrl: '',
    description: '',
    closeFn: () => setModalState(ModalState.Closed),
  });
  const initialLoadConfig = {
    toDisplay: 6,
    itemsShown: [],
    itemsNotShown: [],
    allItems: List<Book>(),
    hasMore: true,
  };

  // Let's call the API.
  const { loadConfig, loading, fetchMore } = useApi(
    getCurrentTopBooksByListName.bind(null, props.listNameEncoded!),
    initialLoadConfig,
  );

  const bestSellerCards = useMemo(() => {
    const { allItems } = loadConfig;
    return loadConfig.itemsShown.map(bestSellerName => {
      const bestSeller = allItems.get(bestSellerName) as Book;
      const onClick = () => {
        setModalState(ModalState.Opened);
        setBuyNowProps({
          ...buyNowProps,
          amazonUrl: findStoreUrl(bestSeller.buy_links, Name.Amazon),
          barnesAndNobleUrl: findStoreUrl(
            bestSeller.buy_links,
            Name.BarnesAndNoble,
          ),
          localStoreUrl: findStoreUrl(
            bestSeller.buy_links,
            Name.LocalBooksellers,
          ),
          bookCoverImgUrl: bestSeller.book_image,
          description: bestSeller.description,
        });
      };

      // Sometimes there may not be an isbn10.
      // I'm using the amazon_product-url because there are times that isbn10 or isbn13 isn't available.

      return (
        <Card
          onClick={onClick}
          key={bestSeller.amazon_product_url}
          title={bestSeller.title}
          imgSrc={bestSeller.book_image}
        />
      );
    });
  }, [loadConfig]);

  if (loading) return <Loading />;
  if (!!loadConfig.errorMsg) return <Error msg={loadConfig.errorMsg!} />;

  return (
    <Grid>
      {modalState == ModalState.Opened && <BuyNow {...buyNowProps} />}
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
