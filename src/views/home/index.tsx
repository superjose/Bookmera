import React, { memo, useState, useEffect } from 'react';

import { getCurrentTopBooks, NyTimesNameApi } from '../../api/data';
import Loading from '../../components/loading';

function Home() {
  const [books, setBooks] = useState<NyTimesNameApi | [] | ApiError>([]);
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
  return (
      
  )
  return <p>data</p>;
}

export default memo(Home);
