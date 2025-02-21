'use client';

import { Pagination, Skeleton } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

import ProductItem from "@/components/ProductItem";
import { INITIAL_BATCH_SIZE, ITEMS_PER_PAGE } from "@/constants/productList";
import { useSearch } from "@/context/SearchContext";
import { ProductAPI } from "@/interfaces/ProductAPI";
import { useProductsList } from "@/hooks/useProductsList";
import { scrollTop } from "@/utils/scroll";

import './ProductList.scss';

export default function ProductList() {

  const { searchTerm } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const [localProducts, setLocalProducts] = useState<ProductAPI[]>([]);

  const { data, totalPages, handleNextPage, offset, isPending, error } = useProductsList(searchTerm);

  const paginatedItems = useMemo(() => {
    return localProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [localProducts, currentPage]);

  const changePage = (event: ChangeEvent<unknown>, page: number) => {
    if (page * ITEMS_PER_PAGE == (offset + ITEMS_PER_PAGE) + INITIAL_BATCH_SIZE) {
      handleNextPage(page);
    }
    setCurrentPage(page);
    scrollTop();
  }

  useEffect(() => {
    setLocalProducts([]);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (!data) return;
    const list = [...localProducts, ...data.pages.flat()];
    setLocalProducts(list);
  }, [data]);

  if (error) return <p>Error al cargar productos.</p>;

  return (
    <ul className="product-list">
      {isPending ? [...Array(ITEMS_PER_PAGE)].map((_, index) =>
        <li key={index} className="product-list__skeleton">
          <Skeleton variant="rectangular" height={220} className="w-[100%] md:w-[15%] rounded" />
          <Skeleton variant="rectangular" height={220} className="w-[100%] md:w-[85%] md:ml-4 rounded" />
        </li>
      ) : paginatedItems?.map((product: ProductAPI) => <ProductItem key={product.id} product={product} />)}

      <Pagination className="product-list__pagination" count={totalPages} page={currentPage} shape="rounded" color="primary" onChange={changePage} />
    </ul>
  )
}