import { Image, View } from "react-native";

export function LoginHeader() {
  return (
    <View className="flex-1 w-full">
      <Image
        source={require("@/assets/images/login-image.jpg")}
        className="h-full w-full"
        resizeMode="cover"
      />
    </View>
  );
}
