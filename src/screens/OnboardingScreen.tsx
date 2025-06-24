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
import MascotSpeech from "@/components/MascotSpeech";
import CustomToggle from "@/components/CustomToggle";
import VibrationIntensity from "@/components/VibrationIntensity";
import { useSettings } from "@/hooks/useSettings";

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const {
    settings,
    updateNotifications,
    updateVibrations,
    updateVibrationIntensity,
  } = useSettings();

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
        <MascotSpeech title="Bienvenue sur Sereinus" isBig={true} />
        <Text style={styles.subtitle}>
          Nous sommes là pour vous aider à surmonter toute crise, petite ou
          grande.
        </Text>
        <CustomToggle
          title="Notifications"
          description="Activez les notifications pour tirer le meilleur parti de Sereinus"
          onToggle={updateNotifications}
          value={settings.notificationsEnabled}
          style={styles.toggleContainer}
        />
        <CustomToggle
          title="Vibrations"
          description="Activer les vibrations pour une sécurité accrue"
          onToggle={updateVibrations}
          value={settings.vibrationsEnabled}
          style={styles.toggleContainer}
        />
        <VibrationIntensity
          value={settings.vibrationIntensity}
          onValueChange={updateVibrationIntensity}
          style={[
            styles.vibrationContainer,
            { opacity: settings.vibrationsEnabled ? 1 : 0 },
          ]}
        />
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#2A4B7C",
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
  skipText: {
    fontSize: 16,
    color: "#2A4B7C",
    fontWeight: "700",
  },
  toggleContainer: {
    width: "100%",
  },
  vibrationContainer: {
    width: "100%",
  },
});

export default OnboardingScreen;
