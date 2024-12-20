import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView, Text } from "react-native";

const Details = () => {
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    // Now you can fetch details or do other things using the `id`
    console.log("Received ID:", id);
  }, [id]);

  return (
    <View className="flex h-full bg-white">
      <Text>Details Screen for List ID: {id}</Text>
    </View>
  );
};

export default Details;
