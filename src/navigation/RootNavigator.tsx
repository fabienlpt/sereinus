import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/screens/HomeScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import VibrationsScreen from "@/screens/VibrationsScreen";
import BreatheScreen from "@/screens/BreatheScreen";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Vibrations: undefined;
  Breathe: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Vibrations" component={VibrationsScreen} />
      <Stack.Screen name="Breathe" component={BreatheScreen} />
    </Stack.Navigator>
  );
}
