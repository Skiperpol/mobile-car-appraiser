import { View } from "react-native";
import {
  type Option,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { useMeasuredWidth } from "../../../../hooks/useMeasuredWidth";
export function HeaderFilters({
  sort,
  status,
  sortOptions,
  statusOptions,
  onSortChange,
  onStatusChange,
}: {
  sort: Option | null;
  status: Option | null;
  sortOptions: Option[];
  statusOptions: Option[];
  onSortChange: (option: Option | null) => void;
  onStatusChange: (option: Option | null) => void;
}) {
  const sortWidth = useMeasuredWidth();
  const statusWidth = useMeasuredWidth();

  return (
    <View className="flex-row gap-3">
      <View className="flex-1" onLayout={sortWidth.onLayout}>
        <Select value={sort ?? undefined} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Wybierz sortowanie"
              className="text-placeholder"
            />
          </SelectTrigger>
          <SelectContent style={sortWidth.style}>
            {sortOptions.map((option, index) => (
              <SelectItem
                key={option?.value ?? String(index)}
                value={option?.value ?? ""}
                label={option?.label ?? ""}
              >
                {option?.label ?? ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
      <View className="flex-1" onLayout={statusWidth.onLayout}>
        {/* <Text className="ml-1 text-xs font-extrabold text-zinc-500 uppercase">
          Status
        </Text> */}
        <Select value={status ?? undefined} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Wybierz status"
              className="text-placeholder"
            />
          </SelectTrigger>
          <SelectContent style={statusWidth.style}>
            {statusOptions.map((option, index) => (
              <SelectItem
                key={option?.value ?? String(index)}
                value={option?.value ?? ""}
                label={option?.label ?? ""}
              >
                {option?.label ?? ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}
