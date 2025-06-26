import { useFonts as useExpoFonts } from "expo-font";

export const useFonts = () => {
  const [fontsLoaded] = useExpoFonts({
    "AlbertSans-Regular": require("../../assets/font/Albert_Sans/AlbertSans-Regular.ttf"),
    "AlbertSans-Medium": require("../../assets/font/Albert_Sans/AlbertSans-Medium.ttf"),
    "AlbertSans-SemiBold": require("../../assets/font/Albert_Sans/AlbertSans-SemiBold.ttf"),
    "AlbertSans-Bold": require("../../assets/font/Albert_Sans/AlbertSans-Bold.ttf"),
  });

  return fontsLoaded;
};
