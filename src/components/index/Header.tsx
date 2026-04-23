import React from "react";
import HeaderComponent from "../HeaderComponent";
import { HeaderFilters } from "./HeaderFilters";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderTopBar } from "./HeaderTopBar";

export default function Header() {
  return (
    <HeaderComponent>
      <HeaderTopBar />
      <HeaderSearch />
      <HeaderFilters />
    </HeaderComponent>
  );
}
