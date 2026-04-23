import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { X } from "lucide-react-native";
import { Modal, Pressable, View } from "react-native";
import { type ReportPhoto } from "./types";

export function PhotoCommentModal({
  visible,
  photo,
  comment,
  onCommentChange,
  onClose,
  onSave,
}: {
  visible: boolean;
  photo: ReportPhoto | null;
  comment: string;
  onCommentChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/45 px-3">
        <View className="w-full rounded-2xl bg-white p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="w-6" />
            <Text className="text-3xl font-bold text-zinc-900">Podglad zdjecia</Text>
            <Pressable onPress={onClose}>
              <X size={20} color="#52525b" />
            </Pressable>
          </View>

          <View className="mb-4 h-80 items-center justify-center rounded-xl bg-slate-900">
            <Text className="text-5xl text-white">Mercedes C-Class</Text>
          </View>

          <Text className="mb-2 text-2xl text-zinc-700">Komentarz</Text>
          <Input
            value={comment}
            onChangeText={onCommentChange}
            placeholder="Dodaj komentarz do zdjecia..."
            className="mb-4 h-14 rounded-xl border-zinc-200 bg-zinc-100 text-lg"
          />

          <View className="flex-row gap-3">
            <Button variant="outline" className="h-12 flex-1 rounded-xl" onPress={onClose}>
              <Text className="text-xl text-zinc-700">Anuluj</Text>
            </Button>
            <Button className="h-12 flex-1 rounded-xl" onPress={onSave} disabled={!photo}>
              <Text className="text-xl font-semibold text-white">Zapisz</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
