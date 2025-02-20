'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import './Header.scss';
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const searchParams = useSearchParams();
  const query = searchParams.get('search');

  const [searchInput, setsearchInput] = useState<string>("");
  
  const {searchTerm, setSearchTerm} = useSearch();
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
    setsearchInput('');
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    router.push(searchInput ? `/items?search=${searchInput}` : "/items");
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
