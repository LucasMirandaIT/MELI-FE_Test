'use client';

import ProductList from "../../components/ProductList";
import MessageSnackbar from "../../components/MessageSnackbar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";

export default function Items() {
  const { searchTerm } = useSearch();

  const [cookies, setCookie] = useCookies(['firstSearch']);
  const [showFirstSearch, setShowFirstSearch] = useState<boolean>(false);

  useEffect(() => {
    if (!cookies.firstSearch) {
      setCookie('firstSearch', 'true', { path: '/' });
      setShowFirstSearch(true);
    };
  }, []);

  return (
    <>
      {searchTerm ? (
        <ProductList />
      ) : (
        <p className="flex mt-8 justify-center items-center">Type something to search.</p>
      )}
      <MessageSnackbar
        isOpen={showFirstSearch}
        message="Bienvenido al flujo de búsqueda!"
        severity="info"
        handleClose={() => setShowFirstSearch(false)} />
    </>
  );
}
