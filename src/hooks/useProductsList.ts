import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;
const INITIAL_BATCH_SIZE = 50;

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

    useEffect(() => {
      console.log('Renderizou Hook');
    }, []);
  
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