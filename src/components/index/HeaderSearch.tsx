import React, { useState } from "react";
import { SearchComponent } from "../SearchComponent";

export function HeaderSearch() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchComponent
      placeholder="Szukaj raportów..."
      value={searchValue}
      onChangeText={setSearchValue}
    />
  );
}
