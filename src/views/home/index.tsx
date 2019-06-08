import React, { memo, useState, useEffect, useReducer } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { getCurrentTopBooks, NyTimesNameApi } from '../../api/data';

import { Error, Loading, Card, Grid } from '../../components';

function Home() {
  const [books, setBooks] = useState<NyTimesNameApi | ApiError>();
  const [count, setCount] = useReducer({
    totalBooks: 6,
    haveAllLoaded: false,
  });
  const [loading, setLoading] = useState(true);
  // Let's call the API.
  useEffect(() => {
    async function fetchData() {
      const topBooks = await getCurrentTopBooks();
      setBooks(topBooks);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;

  if (!!(books as ApiError).error)
    return <Error msg={(books as ApiError).error.msg} />;

  return (
    <React.Fragment>{RenderBooks(books as NyTimesNameApi)}</React.Fragment>
  );
}

function RenderBooks(books: NyTimesNameApi) {
  for (let i = 0; i < 6; i++) {
    renderedElements.push(
      <Card
        key={books.results[i].list_name_encoded}
        title={books.results[i].display_name}
        imgSrc={'https://s1.nyt.com/du/books/images/9780062861214.jpg'}
      />,
    );
  }

  return (
    <Grid>
      <InfiniteScroll>{renderedElements}</InfiniteScroll>
    </Grid>
  );
}

export default memo(Home);
