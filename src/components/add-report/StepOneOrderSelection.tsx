import { Text } from "@/components/ui/text";
import { Check } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SearchComponent } from "../SearchComponent";
import { type Order } from "./types";

type StepOneOrderSelectionProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  orders: Order[];
  selectedOrderId: string;
  onSelectOrder: (id: string) => void;
};

export function StepOneOrderSelection({
  searchValue,
  onSearchChange,
  orders,
  selectedOrderId,
  onSelectOrder,
}: StepOneOrderSelectionProps) {
  return (
    <>
      <Text className="mb-2 text-center text-base text-zinc-600">
        Wybierz istniejace zlecenie lub utworz nowe
      </Text>

      <SearchComponent
        placeholder="Szukaj zlecenia..."
        value={searchValue}
        onChangeText={onSearchChange}
      />

      {orders.map((order) => {
        const isSelected = selectedOrderId === order.id;
        return (
          <Pressable
            key={order.id}
            onPress={() => onSelectOrder(order.id)}
            className={`mb-3 flex-row items-center border rounded-lg bg-white p-4 ${
              isSelected ? "border-zinc-900 bg-zinc-900" : "border-zinc-200"
            }`}
          >
            <View className="mr-4 h-6 w-6 items-center justify-center rounded-full border border-zinc-300 bg-white">
              {isSelected ? <Check size={16} color="#111827" /> : null}
            </View>
            <View className="flex-1">
              <Text
                className={`text-base font-bold ${isSelected ? "text-white" : "text-zinc-900"}`}
              >
                {order.id}
              </Text>
              <Text
                className={`mt-1 text-sm text-zinc-600 ${isSelected ? "text-white" : "text-zinc-600"}`}
              >
                {order.title}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </>
  );
}
