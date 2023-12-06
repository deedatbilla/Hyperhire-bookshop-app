"use client";
import { AxiosHost } from "@/axiosGlobal";
import AuthLayout from "@/components/AuthLayout";
import OrderCard from "@/components/OrderCard";
import { Order, useAppContext } from "@/context/context";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

function Orders() {
  const { getUser } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const handleFetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await AxiosHost.get(
        `/orders?page=${page}&limit=${limit}`
      );
      setOrders(data.orders);
      console.log(data);
      setLoading(false);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
      // toast.error("Somwthing went wrong");
    }
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);

  const onLoadMore = () => {
    if (loadingMore || allLoaded) return;
    const newPage = limit;
    const newLimit = limit + 10;
    setPage(newPage);
    setLimit(newLimit);
    fetchMoreBooks();
  };

  const handleCancelOrder = async (id: string) => {
    try {
      const toastId = toast.loading("Cancelling ");
      const { data } = await AxiosHost.post(`/cancel-order`, { orderId: id });

      getUser();
      toast.dismiss(toastId);
      toast.success("Order Canceled successfully and account refunded");
    } catch (error) {}
  };
  const fetchMoreBooks = async () => {
    try {
      setLoadingMore(true);
      const { data } = await AxiosHost.get(
        `/orders?page=${page}&limit=${limit}`
      );
      if (data.orders.length === 0) {
        setAllLoaded(true);
        setLoadingMore(false);
        return;
      }
      setOrders((previousState) => [...previousState, ...data.orders]);

      setLoadingMore(false);
    } catch (error) {
      setLoadingMore(false);
    }
  };

  return (
    <div className="flex flex-col px-4  w-full">
      <h1>Orders</h1>
      <div className="w-full">
        <InfiniteScroll
          dataLength={orders.length} //This is important field to render the next data
          next={onLoadMore}
          hasMore={!allLoaded}
          className="grid lg:grid-cols-2 divide-x divide-y mt-4 "
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={handleFetchOrders}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {orders.map((item) => (
            <OrderCard
              handleCancelOrder={handleCancelOrder}
              key={item.id}
              data={item}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Orders;
