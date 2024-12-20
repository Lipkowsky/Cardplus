// app/(root)/_layout.tsx
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, SafeAreaView, View } from "react-native";
import { icons } from "@/constants";
import { Text } from "react-native";
import Header from "@/components/Header";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
      width: 40,
    }}
  >
    <Image
      source={source}
      style={{
        width: 24,
        height: 24,
        tintColor: focused ? "#FF6347" : "#B0B0B0",
      }}
      resizeMode="contain"
    />
    {focused && (
      <Text
        style={{
          fontSize: 10,
          color: "#FF6347",
          marginTop: 4,
          fontWeight: "600",
        }}
      >
        Active
      </Text>
    )}
  </View>
);

export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF6347",
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#E0E0E0",
            height: 70,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
          },
        }}
      >
        {/* Zakładka 'home' */}
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.home} focused={focused} />
            ),
          }}
        />

        {/* Zakładka 'profile' */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.home} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="details"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
