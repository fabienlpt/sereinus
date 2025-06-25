import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Header } from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import MascotSpeech from "@/components/MascotSpeech";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const VibrationsScreen: React.FC = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [touchPosition, setTouchPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const pulseAnim = useRef(new Animated.Value(0)).current;

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
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    if (intensity === "Heavy")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    else if (intensity === "Medium")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const startContinuousVibration = (startY: number) => {
    let currentY = startY;

    const loop = () => {
      const intensity = getIntensity(currentY);
      vibrate(intensity);
      setTimeout(() => vibrate(intensity), 50);

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
    <LinearGradient
      colors={["#F5F5F5", "#8FBAA3", "#2A4B7C"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      {...panResponder.panHandlers}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Vibrations" />
        <View style={styles.content}>
          <MascotSpeech
            title="Placez votre doigt sur l'écran pour démarrer"
            isBig={false}
          />
        </View>
      </SafeAreaView>
      {touchPosition && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.halo,
            {
              top: touchPosition.y - 50,
              left: touchPosition.x - 50,
              transform: [
                {
                  scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      1,
                      getIntensity(touchPosition.y) === "Heavy"
                        ? 1.4
                        : getIntensity(touchPosition.y) === "Medium"
                        ? 1.3
                        : 1.2,
                    ],
                  }),
                },
              ],
            },
          ]}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  halo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.9)",
  },
});

export default VibrationsScreen;
