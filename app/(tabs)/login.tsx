import { LoginForm } from "@/components/login/LoginForm";
import { LoginHeader } from "@/components/login/LoginHeader";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 16}
      className="flex-1 bg-zinc-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardDismissMode="on-drag"
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader />
        <LoginForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
