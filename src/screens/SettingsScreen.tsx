import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Header } from "@/components/Header";
import CustomToggle from "@/components/CustomToggle";
import VibrationIntensity from "@/components/VibrationIntensity";
import MascotSpeech from "@/components/MascotSpeech";
import { useSettings } from "@/hooks/useSettings";

const SettingsScreen: React.FC = () => {
  const {
    settings,
    updateNotifications,
    updateVibrations,
    updateVibrationIntensity,
  } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Paramètres" />

      <View style={styles.content}>
        <MascotSpeech title="Personnalisez votre expérience" isBig={false} />
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
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  toggleContainer: {
    width: "100%",
  },
  vibrationContainer: {
    width: "100%",
  },
});

export default SettingsScreen;
