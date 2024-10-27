import axios from "axios";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

// import { fetchAPI } from "@/lib/fetch";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home"),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });

        if (signUp.createdUserId) {
          try {
            const response = await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}/api/users`,
              {
                name: `${signUp.firstName} ${signUp.lastName}`,
                email: signUp.emailAddress,
                clerkId: signUp.createdUserId,
              },
            );

            // IF ROLES NEEDED
            // const responseSetRoles = await axios.patch(
            //   `https://api.clerk.dev/v1/users/${signUp.createdUserId}`,
            //   {
            //     public_metadata: {
            //       role: "org:member", // Dodaj rolę do metadanych publicznych
            //     },
            //   },
            //   {
            //     headers: {
            //       Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLERK_SECRET}`, // Upewnij się, że masz odpowiedni token
            //     },
            //   },
            // );
          } catch (error) {
            console.error("Błąd podczas wysyłania danych do API: ", error);
            return {
              success: false,
              message: "Błąd podczas komunikacji z API",
            };
          }
        }

        return {
          success: true,
          code: "success",
          message: "You have successfully signed in with Google",
        };
      }
    }

    return {
      success: false,
      message: "An error occurred while signing in with Google",
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      code: err.code,
      message: err?.errors[0]?.longMessage,
    };
  }
};

export const fetchAuthToken = async (getToken: () => Promise<any>) => {
  const token = await getToken();
  return token;
};
