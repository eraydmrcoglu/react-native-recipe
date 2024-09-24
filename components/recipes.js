import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import RecipeCard from "./RecipeCard";

export default function Recipes({ categories, meals }) {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>

      <View>
        <MasonryList
          data={meals} 
          keyExtractor={(item) => item.label} 
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}
