"use client";
import BookCard from "@/components/BookCard";
import { Book } from "@/context/context";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(100);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredData, setFilteredData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/books?page=${page}&limit=${limit}`
      );
      setBooks(data.books);
      setFilteredData(data.books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onLoadMore = () => {
    if (loadingMore || allLoaded) return;
    const newPage = limit;
    const newLimit = limit + 100;
    setPage(newPage);
    setLimit(newLimit);
    fetchMoreBooks();
  };

  const fetchMoreBooks = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/books?page=${page}&limit=${limit}`
      );
      if (data.books.length === 0) {
        setAllLoaded(true);
        setLoadingMore(false);
        return;
      }
      setBooks((previousState) => [...previousState, ...data.books]);
      setFilteredData((previousState) => [...previousState, ...data.books]);
      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
    }
  };
  return (
    <div className="flex flex-col px-4 py-6">
      <div className="flex items-center justify-between">
        <h1>Books</h1>
        <div>
          <input
            type="text"
            onChange={(e) => {
              const filtered = books.filter((item) =>
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setFilteredData(filtered);
            }}
           
            className="px-2 py-2 rounded-lg border"
            placeholder="Search"
          />
        </div>
      </div>
     

      <InfiniteScroll
        dataLength={books.length} //This is important field to render the next data
        next={onLoadMore}
        hasMore={!allLoaded}
        className="grid lg:grid-cols-4 divide-x divide-y mt-4"
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={fetchData}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {filteredData.map((item) => (
          <BookCard key={item.id} data={item} />
        ))}
      </InfiniteScroll>
     
    </div>
  );
}
