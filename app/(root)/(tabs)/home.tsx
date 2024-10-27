import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { fetchAuthToken } from "@/lib/auth";
import { useAuth } from "@clerk/clerk-expo";
import { List } from "@/types/type";
import mongoose from "mongoose";

const Home = () => {
  const { getToken } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<List[]>([]); // State to hold the fetched data

  const fetchData = async () => {
    try {
      const token = await fetchAuthToken(getToken);
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/lists/myLists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setData(response.data); // Set the fetched data to the state
    } catch (error) {
      console.error("Błąd podczas wczytywania listy: ", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // Dependency array to re-fetch if getToken changes

  const handleIconPress = () => {
    console.log("CLICK");
  };

  const openNewListModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setNewListTitle("");
    setModalVisible(false);
    setError("");
  };

  const addNewList = async () => {
    if (newListTitle.length === 0) {
      setError("Nazwa nie może być pusta");
      return;
    }
    try {
      const token = await fetchAuthToken(getToken);
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/lists/addList`,
        {
          title: newListTitle.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      await fetchData(); // Call fetchData to update the list
    } catch (error) {
      console.error("Błąd podczas dodawania nowej listy: ", error);
      return {
        success: false,
        message: "Błąd podczas komunikacji z API",
      };
    }
    closeModal();
  };

  const deleteList = async (id: mongoose.Types.ObjectId) => {
    try {
      const token = await fetchAuthToken(getToken);
      await axios.delete(
        `${process.env.EXPO_PUBLIC_API_URL}/api/lists/deleteList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Refresh the list after deletion
      fetchData();
    } catch (error) {
      console.error("Błąd podczas usuwania listy: ", error);
    }
  };

  const renderItem = ({ item }: { item: List }) => (
    <View className="bg-emerald-500 m-2 p-3 rounded-lg flex-row">
      <View className="flex-3">
        <Text className="text-white font-Poppins mb-4 text-2xl font-semibold">
          {item.title}
        </Text>
        <Text className="text-white font-Poppins text-sm">
          {moment(item.createdAt).format("DD-MM-YYYY")}
        </Text>
      </View>

      <View className="flex-1 justify-center items-end mr-5 flex-row">
        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons name="arrow-forward-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteList(item._id)}>
          <Ionicons name="trash-outline" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const keyExtractor = (item: List) => item._id.toString(); // Ensure _id is a string

  return (
    <SafeAreaView className="flex h-full p-2 bg-white">
      <View className="flex w-full flex-row justify-center mx-auto">
        <TouchableOpacity onPress={openNewListModal}>
          <View className="flex flex-row items-center mb-2 mt-2">
            <Ionicons name="add-circle" size={25} color="#0b6336" />
            <Text className="ml-1 font-Poppins font-semibold">
              Dodaj nową listę
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-emerald-900 bg-opacity-50">
          <View className="w-80 bg-white p-4 rounded-lg">
            <Text className="text-xl text-center font-Poppins font-bold mb-4">
              Podaj nazwę listy
            </Text>
            <TextInput
              placeholder="Tytuł nowej listy"
              value={newListTitle}
              className="text-xl font-semibold text-center"
              onChangeText={setNewListTitle}
            />
            {error && (
              <View className="justify-center items-center mt-5">
                <Text className="font-Poppins text-red-500">{error}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={addNewList}
              className="bg-emerald-500 p-2 rounded-lg mt-5"
            >
              <Text className="text-white text-center font-Poppins">Dodaj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeModal}
              className="bg-slate-500 p-2 rounded-lg mt-5"
            >
              <Text className="text-white text-center font-Poppins">
                Zamknij
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor} // Use the updated key extractor
      />
    </SafeAreaView>
  );
};

export default Home;
