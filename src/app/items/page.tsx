'use client';

import { useSearchParams } from "next/navigation";
import ProductList from "../components/ProductList";
import MessageSnackbar from "../components/MessageSnackbar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

export default function Items() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search');

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
      {query ? (
        <ProductList query={query} />
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
