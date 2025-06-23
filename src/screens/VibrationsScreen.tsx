import React, { useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const VibrationsScreen: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);

  const getIntensity = (posY: number) => {
    const ratio = 1 - Math.min(Math.max(posY / SCREEN_HEIGHT, 0), 1);
    if (ratio > 0.66) return "Heavy";
    else if (ratio > 0.33) return "Medium";
    else return "Light";
  };

  const getDelayFromPosition = (posY: number) => {
    const positionRatio = Math.min(Math.max(posY / SCREEN_HEIGHT, 0), 1);
    const minDelay = 250;
    const maxDelay = 1400;
    return minDelay + Math.pow(positionRatio, 2) * (maxDelay - minDelay);
  };

  const vibrate = (intensity: string) => {
    if (intensity === "Heavy") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    else if (intensity === "Medium") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const startContinuousVibration = (startY: number) => {
    let currentY = startY;

    const loop = () => {
      const intensity = getIntensity(currentY);
      vibrate(intensity);
      setTimeout(() => vibrate(intensity), 50); // Double vibration

      const delay = getDelayFromPosition(currentY);
      timeoutRef.current = setTimeout(loop, delay);
    };

    loop();

    return (newY: number) => {
      currentY = newY;
    };
  };

  const stopContinuousVibration = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTouchPosition(null);
  };

  const updatePositionRef = useRef<(y: number) => void>(() => {});

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        updatePositionRef.current = startContinuousVibration(gestureState.y0);
        setTouchPosition({ x: gestureState.x0, y: gestureState.y0 });
      },
      onPanResponderMove: (evt, gestureState) => {
        updatePositionRef.current(gestureState.moveY);
        setTouchPosition({ x: gestureState.moveX, y: gestureState.moveY });
      },
      onPanResponderRelease: () => {
        stopContinuousVibration();
      },
      onPanResponderTerminate: () => {
        stopContinuousVibration();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {touchPosition && (
        <View
          pointerEvents="none"
          style={[
            styles.halo,
            {
              top: touchPosition.y - 60,
              left: touchPosition.x - 60,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  halo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(42, 75, 124, 0.3)",
    shadowColor: "#2A4B7C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
});

export default VibrationsScreen;
