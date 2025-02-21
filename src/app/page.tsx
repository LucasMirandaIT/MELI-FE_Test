'use client';

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import BannerMeliPlus from "@/components/BannerMeliPlus";
import MessageSnackbar from "@/components/MessageSnackbar";

export default function Home() {

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
      <BannerMeliPlus />

      <MessageSnackbar
        isOpen={showFirstSearch}
        message="Bienvenido al flujo de búsqueda!"
        severity="info"
        handleClose={() => setShowFirstSearch(false)} />
    </>
  );
}
