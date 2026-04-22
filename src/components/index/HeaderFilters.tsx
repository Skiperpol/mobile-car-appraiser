import React, { useState } from "react";
import { View } from "react-native";
import { useMeasuredWidth } from "../../hooks/useMeasuredWidth";
import {
  type Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
export function HeaderFilters() {
  const sortWidth = useMeasuredWidth();
  const statusWidth = useMeasuredWidth();

  const [sort, setSort] = useState<Option | null>(null);
  const [status, setStatus] = useState<Option | null>(null);

  return (
    <View className="flex-row gap-3">
      <View className="flex-1" onLayout={sortWidth.onLayout}>
        {/* <Text className="ml-1 text-xs font-extrabold text-zinc-500 uppercase">
          Sortowanie
        </Text> */}
        <Select
          value={sort ?? undefined}
          onValueChange={(option) => option && setSort(option)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz sortowanie" />
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
        {/* <Text className="ml-1 text-xs font-extrabold text-zinc-500 uppercase">
          Status
        </Text> */}
        <Select
          value={status ?? undefined}
          onValueChange={(option) => option && setStatus(option)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz status" />
          </SelectTrigger>
          <SelectContent style={statusWidth.style}>
            <SelectItem value="all" label="Wszystkie">
              Wszystkie
            </SelectItem>
            <SelectItem value="synced" label="Wgrane">
              Wgrane
            </SelectItem>
            <SelectItem value="not-synced" label="Oczekujące">
              Oczekujące
            </SelectItem>
            <SelectItem value="with-errors" label="Z błędami">
              Z błędami
            </SelectItem>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
