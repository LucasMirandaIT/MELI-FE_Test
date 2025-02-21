import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { INITIAL_BATCH_SIZE, ITEMS_PER_PAGE } from "@/constants/productList";

export const useProductsList = (query: string) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

    const fetchProducts = async (query: string, pageOffSet: number) => {
      const offset = pageOffSet > 0 ? pageOffSet + 1 : 0;
      const { data } = await axios.get(`/api/items?offset=${offset}&q=${query}`);
      setTotalPages(Math.ceil(data.paging.total / data.paging.limit));
      return data.items;
    };

    const handleNextPage = (page: number) => {
      setOffset(((page - 1) * ITEMS_PER_PAGE));
    }
  
    const {
      data,
      isPending,
      error,
    } = useInfiniteQuery({
      queryKey: ["products", query, offset],
      queryFn: () => fetchProducts(query, offset),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length * INITIAL_BATCH_SIZE : undefined;
      },
    });

    return { data, totalPages, offset, isPending, error, handleNextPage };
};