import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";

export default function RecipeDetailScreen(props) {
  let item = props.route.params.item;
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(item);
  const [loading, setLoading] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getNutritionData(item.ingredients);
  }, []);

  const getNutritionData = async (ingredients) => {
    const app_id = "714f1453";
    const app_key = "6e7f6deba01f59fa82f6b9db07ac580";
    try {
      const res = await axios.post(
        `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${app_id}&app_key=${app_key}`,
        {
          ingredients: ingredients.map((ingredient) => ({
            quantity: 1,
            measureURI:
              "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
            foodId: ingredient.foodId,
          })),
        }
      );
      setNutritionData(res.data.totalNutrients);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) return match[1];
    return null;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className="bg-red-100 flex-1"
    >
      <StatusBar style={"light"} />

      <View className="flex-row justify-center">
        <Image
          source={{ uri: meal.image }}
          style={{
            width: wp(100),
            height: hp(50),
            borderRadius: 20,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        />
      </View>

      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3)} strokeWidth={4} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            size={hp(3)}
            strokeWidth={4}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <View className="space-y-2">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3.5) }}
            >
              {meal.label}
            </Text>
            <Text
              className="font-medium flex-1 text-red-500"
              style={{ fontSize: hp(2) }}
            >
              {meal.source}
            </Text>
          </View>

          <View className="flex-row justify-around">
            <View className="flex rounded-full bg-red-400 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  {meal.totalTime || 35}
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-red-400 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  {meal.yield || 4}
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full bg-red-400 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(2) }}
                >
                  {Math.round(meal.calories)}
                </Text>
                <Text
                  className="font-bold text-neutral-700"
                  style={{ fontSize: hp(1.3) }}
                >
                  Cal
                </Text>
              </View>
            </View>
          </View>

          <View className="space-y-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(3.5) }}
            >
              Ingredients
            </Text>

            <View className="space-y-2 ml-3">
              {meal.ingredientLines.map((ingredient, index) => (
                <View key={index} className="flex-row items-center space-x-4">
                  <View
                    style={{ height: hp(1.5), width: hp(1.5) }}
                    className="bg-red-500 rounded-full"
                  />
                  <Text
                    className="font-medium text-neutral-600"
                    style={{ fontSize: hp(1.7) }}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {nutritionData && (
            <View className="space-y-4">
              <Text
                className="font-bold flex-1 text-neutral-700"
                style={{ fontSize: hp(3.5) }}
              >
                Nutrition Facts
              </Text>
              <Text>Protein: {nutritionData.PROCNT.quantity}g</Text>
              <Text>Fat: {nutritionData.FAT.quantity}g</Text>
              <Text>Carbohydrates: {nutritionData.CHOCDF.quantity}g</Text>
            </View>
          )}

          {meal.strYoutube && (
            <View className="space-y-4">
              <Text
                className="font-bold flex-1 text-neutral-700"
                style={{ fontSize: hp(3.5) }}
              >
                Recipe Video
              </Text>

              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
