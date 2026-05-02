import { Text } from "@/components/ui/text";
import { CheckCircle2, GripVertical } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { type ReportPhoto } from "../../types/types";

function PhotoTile({
  photo,
  onPress,
}: {
  photo: ReportPhoto;
  onPress: () => void;
}) {
  return (
    <Pressable className="w-[48%]" onPress={onPress}>
      <View className="mb-1 rounded-xl bg-slate-900 px-2 py-2">
        <View className="flex-row items-center justify-between">
          <CheckCircle2 size={15} color="#22c55e" />
          <View className="flex-row items-center gap-1 rounded-full bg-slate-950/50 px-2 py-1">
            <Text className="text-sm font-semibold text-white">
              #{photo.id}
            </Text>
            <GripVertical size={13} color="#ffffff" />
          </View>
        </View>
        <View className="h-24 items-center justify-center overflow-hidden rounded-lg bg-slate-800">
          {photo.uri ? (
            <Image
              source={{ uri: photo.uri }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-lg text-white">Brak podgladu</Text>
          )}
        </View>
      </View>
      <Text className="text-base text-zinc-600">{photo.title}</Text>
    </Pressable>
  );
}

export function PhotosGridCard({
  photos,
  onPhotoPress,
  statusLabel,
}: {
  photos: ReportPhoto[];
  onPhotoPress: (photo: ReportPhoto) => void;
  statusLabel: string;
}) {
  return (
    <View className="rounded-2xl border border-zinc-200 bg-white p-4">
      <View className="mb-3 flex-row items-center justify-between border-b border-zinc-200 pb-3">
        <Text className="text-3xl font-bold text-zinc-900">
          Zdjecia ({photos.length})
        </Text>
        <View className="flex-row items-center gap-1">
          <CheckCircle2 size={16} color="#16a34a" />
          <Text className="text-base text-green-600">{statusLabel}</Text>
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {photos.map((photo) => (
          <PhotoTile
            key={photo.id}
            photo={photo}
            onPress={() => onPhotoPress(photo)}
          />
        ))}
      </View>
    </View>
  );
}
