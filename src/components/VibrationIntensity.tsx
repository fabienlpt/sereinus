import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Slider from "@react-native-community/slider";
import { Text } from "./CustomText";

interface VibrationIntensityProps {
  value: number;
  onValueChange: (value: number) => void;
  style?: ViewStyle | ViewStyle[];
}

export const VibrationIntensity: React.FC<VibrationIntensityProps> = ({
  value,
  onValueChange,
  style,
}) => {
  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 0.33) return "Faible";
    if (intensity <= 0.66) return "Moyenne";
    return "Forte";
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>
        Quelle intensité voulez-vous donner à vos vibrations ?
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={value}
          onValueChange={onValueChange}
          minimumTrackTintColor="#2A4B7C"
          maximumTrackTintColor="#e0e0e0"
        />
        <Text style={styles.intensityLabel}>{getIntensityLabel(value)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    color: "#2A4B7C",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: "center",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  thumb: {
    backgroundColor: "#2A4B7C",
    width: 20,
    height: 20,
  },
  intensityLabel: {
    color: "#7f8c8d",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
  },
});

export default VibrationIntensity;
