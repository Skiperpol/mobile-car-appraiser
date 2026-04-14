import { Text, View } from "@/components/Themed";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Image } from "react-native";
export default function Login() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("@/assets/images/login-image.jpg")}
        className="w-full h-full object-cover"
      />
      <Text className="text-center text-2xl font-bold">Witaj ponownie</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" />
      <Checkbox checked={false} onCheckedChange={() => {}} />
      <Text>Zapamiętaj mnie</Text>
      <Button>
        <Text>Zaloguj się</Text>
      </Button>
    </View>
  );
}
