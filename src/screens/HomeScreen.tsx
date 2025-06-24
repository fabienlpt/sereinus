import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CustomButton } from "@/components/CustomButton";
import { RootStackParamList } from "@/types/navigation";
import MascotSpeech from "@/components/MascotSpeech";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleCrisisMode = () => {
    console.log("Mode crise activé");
  };

  const handleBreathing = () => {
    navigation.navigate("Breathe");
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const handleVibrations = () => {
    navigation.navigate("Vibrations");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Image
            source={require("../../assets/settings.png")}
            width={24}
            height={32}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <MascotSpeech title="Bienvenue sur Sereinus" isBig={false} />
        <Text style={styles.subtitle}>
          Vous n'êtes pas seul. Nous sommes là pour vous aider à surmonter cette
          épreuve.
        </Text>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Urgence "
            icon={require("../../assets/emergency.png")}
            onPress={handleCrisisMode}
            style={[styles.button, { backgroundColor: "#D9534F" }]}
          />
          <CustomButton
            title="Respiration"
            icon={require("../../assets/haleine.png")}
            onPress={handleBreathing}
            style={styles.button}
          />

          <CustomButton
            title="Ancrage sensoriel"
            icon={require("../../assets/ancre.png")}
            onPress={handleBreathing}
            style={styles.button}
          />
          <CustomButton
            title="Vibrations"
            icon={require("../../assets/vibrate.png")}
            onPress={handleVibrations}
            style={styles.button}
          />
        </View>
        <Text style={styles.subtitle}>
          En cas d'urgence, appelez le 15 ou rendez-vous à l'hôpital le plus
          proche.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  spacer: {
    flex: 1,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 40,
    textAlign: "center",
  },
  section: {
    marginBottom: 40,
  },
  moodText: {
    fontSize: 16,
    color: "#2c3e50",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    marginBottom: 16,
  },
});

export default HomeScreen;
