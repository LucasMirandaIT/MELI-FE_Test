'use client';

import { useEffect } from "react";
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

  // const [searchTerm, setSearchTerm] = useState<string>("");
  const {searchTerm, setSearchTerm} = useSearch();
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
    setSearchTerm('');
  };

  const handleSearch = () => {
    router.push(searchTerm ? `/items?search=${searchTerm}` : "/items");
  };

  useEffect(() => {
    if (query && !searchTerm) {
      setSearchTerm(query);
    }
  }, []);

  return (
    <section className="search__wrapper">
      <div className="search__bar">
        <Image onClick={navigateHome} className="search__bar__logo" src={Logo} alt="MercadoLibre logo" priority />
        <TextField
          className="search__bar__input"
          variant="outlined"
          placeholder="Buscar productos, marcas y más…"
          value={searchTerm}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          onChange={(e) => setSearchTerm(e.target.value)}
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
