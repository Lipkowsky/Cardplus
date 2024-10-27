import { fetchAuthToken } from "@/lib/auth";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { getToken, userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await fetchAuthToken(getToken);

      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // If needed
            },
          },
        );

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchProfile();
  }, [getToken, userId]);

  // Handle loading state
  if (loading) {
    return (
      <SafeAreaView className="flex h-full p-8 bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex h-full p-8 bg-white">
        <Text className="text-black text-xl">User not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex h-full p-8 bg-white">
      <View className="flex w-full flex-row items-center">
        <Text className="text-black text-xl">Hello {user.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
