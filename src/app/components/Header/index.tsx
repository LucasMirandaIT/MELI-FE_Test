'use client';

import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";

import Logo from "@/assets/images/logo.png";
import { useSearch } from "@/context/SearchContext";

import './Header.scss';

export default function Header() {
  const router = useRouter();
  const {searchTerm, setSearchTerm} = useSearch();
  const [searchInput, setsearchInput] = useState<string>("");
  const searchParams = useSearchParams();

  const query = searchParams.get('search');

  const navigateHome = () => {
    router.push('/');
    setsearchInput('');
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    const route = searchInput ? `/items?search=${searchInput}` : "/items";
    router.push(route);
  };

  useEffect(() => {
    if (query && !searchTerm) {
      setsearchInput(query);
      setSearchTerm(query);
    }
  }, [query, searchTerm]);

  return (
    <section className="search__wrapper">
      <div className="search__bar">
        <Image onClick={navigateHome} className="search__bar__logo" src={Logo} alt="MercadoLibre logo" priority />
        <TextField
          className="search__bar__input"
          variant="outlined"
          placeholder="Buscar productos, marcas y más…"
          value={searchInput}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onChange={(e) => setsearchInput(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }
          }}
        />
      </div>
    </section>
  );
}
