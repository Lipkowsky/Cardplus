import OAuth from "@/components/OAuth/OAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView className="flex h-full items-center bg-white">
      <View className="mt-10 flex h-[200px] justify-between">
        <Text className="text-black font-bold text-2xl">
          Witaj w aplikacji !
        </Text>
        <Text className="text-black font-bold text-xl">
          Aby uzyskać dostęp do aplikacji, wymagane jest zalogowanie.
        </Text>
      </View>
      <View className="mt-10">
        <OAuth />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
