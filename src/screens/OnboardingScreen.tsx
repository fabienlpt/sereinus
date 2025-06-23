import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "@/types/navigation";

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasLaunched", "true");
      navigation.replace("Home");
    } catch (error) {
      console.log("Error saving launch status:", error);
      navigation.replace("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenue sur Sereinus</Text>
        <Text style={styles.subtitle}>Votre compagnon bien-être personnel</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleFinishOnboarding}
        >
          <Text style={styles.getStartedText}>Commencer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFinishOnboarding}>
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  skipText: {
    fontSize: 16,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#2A4B7C",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  skipButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;
