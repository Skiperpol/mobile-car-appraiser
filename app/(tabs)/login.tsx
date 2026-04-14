import { Text, View } from "@/src/components/Themed";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Image } from "react-native";
export default function Login() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image source={require("@/src/assets/images/login-image.jpg")} />
      <Text className="text-center text-2xl font-bold">
        Welcome back to the app. Please enter your email and password to
        continue.
      </Text>
      <Input
        placeholder="Email"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <Input
        placeholder="Password"
        className="border-2 border-gray-300 rounded-md p-2"
      />
      <Button>
        <ButtonText>Login</ButtonText>
      </Button>
    </View>
  );
}
