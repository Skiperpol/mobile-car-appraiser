import React from "react";
import HeaderComponent from "../../../../components/HeaderComponent";
import { HeaderFilters } from "./HeaderFilters";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderTopBar } from "./HeaderTopBar";
import { type Option } from "@/components/ui/select";

export default function Header({
  searchValue,
  onSearchChange,
  sort,
  status,
  sortOptions,
  statusOptions,
  onSortChange,
  onStatusChange,
  onRefresh,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sort: Option | null;
  status: Option | null;
  sortOptions: Option[];
  statusOptions: Option[];
  onSortChange: (option: Option | null) => void;
  onStatusChange: (option: Option | null) => void;
  onRefresh: () => void;
}) {
  return (
    <HeaderComponent>
      <HeaderTopBar onRefresh={onRefresh} />
      <HeaderSearch searchValue={searchValue} onSearchChange={onSearchChange} />
      <HeaderFilters
        sort={sort}
        status={status}
        sortOptions={sortOptions}
        statusOptions={statusOptions}
        onSortChange={onSortChange}
        onStatusChange={onStatusChange}
      />
    </HeaderComponent>
  );
}
