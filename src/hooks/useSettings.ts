import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Settings {
  notificationsEnabled: boolean;
  vibrationsEnabled: boolean;
  vibrationIntensity: number;
}

const DEFAULT_SETTINGS: Settings = {
  notificationsEnabled: false,
  vibrationsEnabled: false,
  vibrationIntensity: 0.5,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settingsJson = await AsyncStorage.getItem("settings");
      if (settingsJson) {
        const parsedSettings = JSON.parse(settingsJson);
        setSettings({ ...DEFAULT_SETTINGS, ...parsedSettings });
      }
    } catch (error) {
      console.log("Error loading settings:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      await AsyncStorage.setItem("settings", JSON.stringify(updatedSettings));
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  const updateNotifications = (enabled: boolean) => {
    saveSettings({ notificationsEnabled: enabled });
  };

  const updateVibrations = (enabled: boolean) => {
    saveSettings({ vibrationsEnabled: enabled });
  };

  const updateVibrationIntensity = (intensity: number) => {
    saveSettings({ vibrationIntensity: intensity });
  };

  return {
    settings,
    isLoaded,
    updateNotifications,
    updateVibrations,
    updateVibrationIntensity,
  };
};
