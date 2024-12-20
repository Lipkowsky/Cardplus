import { Tabs } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

// Zaktualizowany komponent TabIcon
const TabIcon = ({
  focused,
  label, // Przekazujemy nazwę zakładki
}: {
  focused: boolean;
  label: string;
}) => {
  let iconName: any;

  switch (label) {
    case "Home":
      iconName = focused ? "home" : "home-outline"; // Focused - pełna ikona, inaczej outline
      break;
    case "Profile":
      iconName = focused ? "person" : "person-outline"; // Focused - pełna ikona, inaczej outline
      break;
    default:
      iconName = "home"; // Domyślnie ustawiamy home
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        width: 40,
      }}
    >
      <Ionicons
        name={iconName} // Przypisanie ikony w zależności od zakładki
        size={24}
        color={focused ? "#0369a1" : "#B0B0B0"} // Kolor zależny od stanu "focused"
      />
      <Text
        style={{
          fontSize: 10,
          color: focused ? "#0369a1" : "#B0B0B0",
          marginTop: 4,
          fontWeight: focused ? "600" : "400", // Waga czcionki zależna od stanu
        }}
      >
        {label}
      </Text>
    </View>
  );
};

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
              <TabIcon focused={focused} label="Home" /> // Przekazujemy nazwę zakładki "Home"
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
              <TabIcon focused={focused} label="Profile" /> // Przekazujemy nazwę zakładki "Profile"
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
