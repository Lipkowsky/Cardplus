import { Stack } from "expo-router";

import "react-native-reanimated";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;