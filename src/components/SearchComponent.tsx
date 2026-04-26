import { Search } from "lucide-react-native";
import { View } from "react-native";
import { Input } from "./ui/input";

export function SearchComponent({
  placeholder,
  value,
  onChangeText,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View className="relative justify-center">
      <View className="absolute left-3 z-10">
        <Search size={18} className="text-placeholder" />
      </View>
      <Input
        placeholder={placeholder}
        className="pl-10 placeholder:text-placeholder"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
