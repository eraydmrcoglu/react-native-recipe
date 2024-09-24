import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({ activeCategory, handleChangeCategory }) {
  const categories = [
    {
      name: "Starter",
      image:
        "https://img.delicious.com.au/fFU7B22c/w1200/del/2015/10/carrot-tzatziki-15562-2.jpg",
    },
    {
      name: "Soup",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/2/2016/08/25097.jpg?quality=90&crop=2px,151px,596px,542px&resize=556,505",
    },
    {
      name: "Salad",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg",
    },
    {
      name: "Chicken",
      image:
        "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?cs=srgb&dl=pexels-harry-dona-2338407.jpg&fm=jpg",
    },
    {
      name: "Beef",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/roast-beef-recipes-536cd86.jpg?quality=90&resize=440,400",
    },
    {
      name: "Seafood",
      image:
        "https://www.foodandwine.com/thmb/ClPnka2WSnl5PtrMYOjlmXsXw1k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/escovitch-fish-FT-RECIPE0920-8a733638c2ba4b72b48737782fa616c2.jpg",
    },
    {
      name: "Pasta",
      image:
        "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2023-01-Caramelized-Tomato-Paste-Pasta%2F06-CARAMELIZED-TOMATO-PASTE-PASTA-039",
    },
    {
      name: "Dessert",
      image:
        "https://static.vecteezy.com/system/resources/previews/028/626/678/non_2x/hd-ai-generative-free-photo.jpg",
    },
  ];

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.name == activeCategory;
          let activeButtonClass = isActive ? " bg-red-400" : " bg-black/10";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.name)}
              className="flex items-center space-y-1"
            >
              <View className={"rounded-full p-[6px] " + activeButtonClass}>
                <Image
                  source={{ uri: cat.image }}
                  style={{
                    width: wp(12),
                    height: wp(12),
                    borderRadius: wp(10),
                  }}
                  resizeMode="cover"
                />
              </View>

              <Text
                className="text-neutral-600"
                style={{ fontSize: hp(2) }} 
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
