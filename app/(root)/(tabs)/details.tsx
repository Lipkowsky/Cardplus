import { useAuth } from "@clerk/clerk-expo";
import { List, ListItem } from "@/types/type";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, Text } from "react-native";
import { fetchAuthToken } from "@/lib/auth";

// Komponent formularza dodawania produktu
interface AddProductFormProps {
  onAddProduct: (product: string, quantity: string) => void;
}

const AddProductForm = ({ onAddProduct }: AddProductFormProps) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [error, setError] = useState<string | null>(null);

  const handleAddProduct = () => {
    setError(null);
    if (!product.trim()) {
      setError("Produkt nie może być pusty.");
      return;
    }
    if (!quantity.trim()) {
      setError("Ilość nie może być pusta.");
      return;
    }
    onAddProduct(product, quantity);
    setProduct("");
    setQuantity("1");
  };

  return (
    <View className="flex-col justify-between mb-4">
      <TextInput
        className="border border-black rounded-md p-2 w-[100%] mb-2"
        placeholder="Mleko..."
        value={product}
        onChangeText={(value) => setProduct(value)}
      />
      <View className="flex-row justify-between">
        <TextInput
          className="border border-black rounded-md p-2 w-[48%]"
          placeholder="Podaj ilość"
          value={quantity}
          keyboardType="numeric"
          onChangeText={(value) => {
            const numericValue = value.replace(/[^0-9]/g, "");
            setQuantity(numericValue);
          }}
        />
        <TouchableOpacity
          className="bg-sky-800 py-2 px-4 rounded-md w-[48%]"
          onPress={handleAddProduct}
        >
          <Text className="text-white text-center font-bold">Dodaj</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <Text className="text-red-500 text-center mt-2 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
};

const Details = () => {
  const { getToken } = useAuth();
  const params = useLocalSearchParams();
  const { id } = params;
  const [data, setData] = useState<List | null>(null); // Inicjalizuj z `null` zamiast undefined
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Funkcja pobierania danych
  const fetchData = async () => {
    setLoading(true); // Rozpocznij ładowanie
    try {
      const token = await fetchAuthToken(getToken);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/lists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Fetched data:", response.data);
      setData(response.data); // Zaktualizuj stan
    } catch (error) {
      console.error("Błąd podczas wczytywania listy: ", error);
    } finally {
      setLoading(false); // Zakończ ładowanie
    }
  };

  // Funkcja do obsługi dodawania produktu
  const handleAddProduct = async (product: string, quantity: string) => {
    const productAdd = {
      name: product,
      quantity,
    };
    try {
      const token = await fetchAuthToken(getToken);
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/lists/${id}/add`,
        productAdd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Product added:", productAdd);
      fetchData(); // Po dodaniu produktu, zaktualizuj dane
    } catch (error) {
      console.error("Błąd podczas dodawania produktu: ", error);
    }
  };

  // Używamy useEffect do ładowania danych przy każdej zmianie `id`
  useEffect(() => {
    console.log("Received ID:", id);
    setData(null); // Resetujemy dane przy zmianie ID
    fetchData(); // Wczytujemy dane z nowym ID
  }, [id]); // Reakcja na zmianę ID

  const renderItem = ({ item }: { item: ListItem }) => (
    <View className="bg-sky-800 mt-2 p-2 rounded-lg">
      <View className="flex-row mb-2">
        <Text className="text-white text-sm font-semibold mr-4">
          {item.name}
        </Text>
        <Text className="text-white text-sm  font-semibold ml-auto">
          {item.quantity}
        </Text>
      </View>
      <Text className="text-white text-xs">{item.createdBy.email}</Text>
    </View>
  );

  return (
    <View className="flex-1 h-full bg-white px-4 pb-[22%]">
      {" "}
      {/* Dodanie mb-16 aby zostawić przestrzeń na TabBar */}
      <AddProductForm onAddProduct={handleAddProduct} />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1E40AF" />
        </View>
      ) : (
        <FlatList data={data?.items} renderItem={renderItem} />
      )}
    </View>
  );
};

export default Details;
