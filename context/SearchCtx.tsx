"use client";
import React, { createContext, useContext, useState } from "react";

interface ICtx {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<ICtx>({ search: "", setSearch: () => {} });

type Props = {
  children: React.ReactNode;
};

export const SearcProvider = ({ children }: Props) => {
  const [search, setSearch] = useState<string>("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const UseSearchContext = ()=>{
    return useContext(SearchContext)
}
