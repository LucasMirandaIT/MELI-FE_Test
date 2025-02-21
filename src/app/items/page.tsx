'use client';

import ProductList from "@/components/ProductList";
import { useSearch } from "@/context/SearchContext";

export default function Items() {
  const { searchTerm } = useSearch();

  return (
    searchTerm ? (
      <ProductList />
    ) : (
      <p className="flex mt-8 justify-center items-center">Type something to search.</p>
    )
  );
}
