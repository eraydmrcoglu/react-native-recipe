import { View, Text, Image } from "react-native"
import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Animated, { useSharedValue, withSpring } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"

export default function WelcomeScreen() {
	const ring1padding = useSharedValue(0)
	const ring2padding = useSharedValue(0)
	const navigation = useNavigation()

	useEffect(() => {
		ring1padding.value = 0
		ring2padding.value = 0

		setTimeout(() => {
			ring1padding.value = withSpring(ring1padding.value + hp(5))
		}, 200)

		setTimeout(() => {
			ring2padding.value = withSpring(ring2padding.value + hp(5.5))
		}, 300)

		setTimeout(() => {
			navigation.navigate("Home")
		}, 2000)
	}, [])

	return (
		<View className="flex-1 justify-center items-center space-y-10 bg-red-200">
			<StatusBar style="light" />

			<Animated.View
				className="bg-white/20 rounded-full"
				style={{ padding: ring2padding }}
			>
				<Animated.View
					className="bg-white/20 rounded-full"
					style={{ padding: ring1padding }}
				>
					<Image
						source={require("../assets/images/app.png")}
						style={{ width: hp(20), height: hp(20) }}
					/>
				</Animated.View>
			</Animated.View>

			<View className="flex items-center space-y-2">
				<Text
					className="text-center font-bold text-black tracking-widest"
					style={{ fontSize: hp(5) }}
				>
					Cooking Recipe
				</Text>
				<Text
					className="font-medium text-black tracking-widest"
					style={{ fontSize: hp(2) }}
				>
					Food is always right
				</Text>
			</View>
		</View>
	)
}
