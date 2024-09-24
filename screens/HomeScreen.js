import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import Loading from "../components/loading";
import axios from "axios";
import Recipes from "../components/recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Starter");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    setCategories([
      { name: "Starter" },
      { name: "Soup" },
      { name: "Salad" },
      { name: "Chicken" },
      { name: "Beef" },
      { name: "Seafood" },
      { name: "Pasta" },
      { name: "Dessert" },
    ]);
  };

  const getRecipes = async (category = "Starter", query = "") => {
    const app_id = "cba4092b";
    const app_key = "b958c3490434c4294a521bc06af0e5d6";

    const from = 0;
    const to = 20;

    try {
      const res = await axios.get(
        `https://api.edamam.com/search?q=${
          query || category
        }&app_id=${app_id}&app_key=${app_key}&from=${from}&to=${to}`
      );
      if (res && res.data) {
        const recipes = res.data.hits.map((hit) => hit.recipe);
        setMeals(recipes);
      }
    } catch (error) {
      console.log("error: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      getRecipes(activeCategory, searchQuery);
    } else {
      getRecipes(activeCategory);
    }
  }, [searchQuery, activeCategory]);

  return (
    <View className="flex-1 bg-red-100">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../assets/images/app.png")}
            style={{ height: hp(5), width: hp(5.5) }}
            className="rounded-full"
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-800"
            >
              Make your own food
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-800"
          >
            Stay at <Text className="text-red-500">Home</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/10 p-[6px]">
          <TextInput
            placeholder="Search any Recipe"
            placeholderTextColor={"black"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        <View>
          {loading ? (
            <Loading size="large" className="mt-20" />
          ) : (
            <Recipes
              meals={meals.map((meal, index) => ({
                ...meal,
                key: `${meal.label}-${index}`,
              }))}
              categories={categories}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}