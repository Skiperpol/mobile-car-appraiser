import React from "react";
import { View } from "react-native";
import { useMeasuredWidth } from "../../hooks/useMeasuredWidth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function HeaderFilters() {
  const sortWidth = useMeasuredWidth();
  const statusWidth = useMeasuredWidth();

  return (
    <View className="flex-row gap-3">
      <View className="flex-1" onLayout={sortWidth.onLayout}>
        <Select value={{ label: "Wedlug daty", value: "date" }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz filtrowanie" />
          </SelectTrigger>
          <SelectContent style={sortWidth.style}>
            <SelectItem value="date" label="Wedlug daty">
              Wedlug daty
            </SelectItem>
            <SelectItem value="name" label="Według nazwy">
              Według nazwy
            </SelectItem>
          </SelectContent>
        </Select>
      </View>
      <View className="flex-1" onLayout={statusWidth.onLayout}>
        <Select value={{ label: "Wszystkie", value: "all" }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz filtrowanie" />
          </SelectTrigger>
          <SelectContent style={statusWidth.style}>
            <SelectItem value="date" label="Wedlug daty">
              Wszystkie
            </SelectItem>
            <SelectItem value="name" label="Według nazwy">
              Zsynchronizowane
            </SelectItem>
            <SelectItem value="name" label="Według nazwy">
              Niezsynchronizowane
            </SelectItem>
            <SelectItem value="name" label="Według nazwy">
              Z błędami
            </SelectItem>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
