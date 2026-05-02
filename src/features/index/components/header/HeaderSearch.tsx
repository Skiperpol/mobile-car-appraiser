import { SearchComponent } from "../../../../components/SearchComponent";

export function HeaderSearch({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <SearchComponent
      placeholder="Szukaj raportów..."
      value={searchValue}
      onChangeText={onSearchChange}
    />
  );
}
