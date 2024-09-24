import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = ({ item, index }) => {
  const navigation = useNavigation();
  let isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        onPress={() => navigation.navigate("RecipeDetail", { item })}
      >
        <Image
          source={{ uri: item.image }} 
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
          sharedTransitionTag={item.label}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.label.length > 20
            ? item.label.slice(0, 20) + "..."
            : item.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default RecipeCard;
