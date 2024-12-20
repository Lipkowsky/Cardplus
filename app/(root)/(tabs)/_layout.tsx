// app/(root)/_layout.tsx
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, SafeAreaView, View } from "react-native";
import { icons } from "@/constants";
import { Text } from "react-native";
import Header from "@/components/Header";

const TabIcon = ({
  source,
  focused,
  label, // Dodajemy label, który będzie przekazywał nazwę zakładki
}: {
  source: ImageSourcePropType;
  focused: boolean;
  label: string; // Typ dla przekazywanej nazwy zakładki
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
        tintColor: focused ? "#0369a1" : "#B0B0B0",
      }}
      resizeMode="contain"
    />
    <Text
      style={{
        fontSize: 10,
        color: focused ? "#0369a1" : "#B0B0B0", // Adjust the color based on focused state
        marginTop: 4,
        fontWeight: focused ? "600" : "400", // Adjust font weight for focus state
      }}
    >
      {label}
    </Text>
  </View>
);

export default function _layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0369a1",
          tabBarInactiveTintColor: "#0369a1",
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
              <TabIcon source={icons.home} focused={focused} label="Home" /> // Przekazujemy nazwę zakładki "Home"
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
              <TabIcon source={icons.home} focused={focused} label="Profile" /> // Przekazujemy nazwę zakładki "Profile"
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
