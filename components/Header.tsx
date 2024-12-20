import { icons } from "@/constants";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView className="bg-white">
      <View className="flex flex-row mb-2 items-center justify-around pt-2 pb-2 pl-4 border-b border-sky-900">
        <Text className="font-Poppins font-semibold text-xs text-black">
          Witaj! {user?.emailAddresses[0].emailAddress!}
        </Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="justify-center items-end w-10 h-10 rounded-full bg-white ml-5"
        >
          <Image source={icons.out} className="w-3 h-3" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
