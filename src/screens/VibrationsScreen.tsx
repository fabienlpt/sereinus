import React, { useRef, useState } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const VibrationsScreen: React.FC = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; timestamp: number; intensity: string }>>([]);
  const getIntensity = (posY: number) => {
    const r = 1 - Math.min(Math.max(posY / SCREEN_HEIGHT, 0), 1); 
    if (r > 0.75) return "Heavy";
    if (r > 0.50) return "Medium";
    if (r > 0.30) return "Light";
    if (r > 0.10) return "VeryLight"; 
    return "Silent"; 
  };

  const getDelayFromPosition = (posY: number) => {
    const ratio = Math.min(Math.max(posY / SCREEN_HEIGHT, 0), 1);
    const minDelay = 150;
    
    if (ratio > 0.7) { 
      return 800;
    } else if (ratio > 0.5) { 
      return 1500; 
    } else if (ratio > 0.3) {
      return 2000 + Math.pow(ratio, 4) * 3000; 
    } else { 
      return minDelay + Math.pow(ratio, 2) * 1000;
    }
  };

  const vibrateHeartbeat = (intensity: string) => {
    vibrate(intensity);
    setTimeout(() => {
      vibrate(intensity);
    }, 120);
  };

  const vibrate = (level: string) => {
    switch (level) {
      case "Heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "Medium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "Light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "VeryLight":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "Silent":
      default:
        break;
    }
  };

  const startContinuousVibration = (startY: number) => {
    let currentY = startY;

    const loop = () => {
      const intensity = getIntensity(currentY);
      const ratio = Math.min(Math.max(currentY / SCREEN_HEIGHT, 0), 1);
    
      if (ratio > 0.7 && intensity !== "Silent") {
        vibrateHeartbeat(intensity);
      } else {
        vibrate(intensity);
        if (ratio < 0.4 && (intensity === "Heavy" || intensity === "Medium")) {
          setTimeout(() => vibrate(intensity), 50);
        }
      }

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

  const updatePosRef = useRef<(y: number) => void>(() => {});

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, g) => {
        updatePosRef.current = startContinuousVibration(g.y0);
        const newPosition = { x: g.x0, y: g.y0 };
        setTouchPosition(newPosition);
        setTrail([{
          x: g.x0,
          y: g.y0,
          timestamp: Date.now(),
          intensity: getIntensity(g.y0)
        }]);
      },
      onPanResponderMove: (evt, g) => {
        updatePosRef.current(g.moveY);
        const newPosition = { x: g.moveX, y: g.moveY };
        setTouchPosition(newPosition);
        setTrail(prevTrail => {
          const now = Date.now();
          const filteredTrail = prevTrail
            .filter(point => now - point.timestamp < 1000)
            .slice(-15);
          
          return [...filteredTrail, {
            x: g.moveX,
            y: g.moveY,
            timestamp: now,
            intensity: getIntensity(g.moveY)
          }];
        });
      },
      onPanResponderRelease: () => {
        stopContinuousVibration();
        setTimeout(() => setTrail([]), 500);
      },
      onPanResponderTerminate: () => {
        stopContinuousVibration();
        setTimeout(() => setTrail([]), 500);
      },
    })
  ).current;

  const getTrailColor = (intensity: string, opacity: number) => {
    const baseOpacity = opacity * 0.6; 
    switch (intensity) {
      case "Heavy":
        return `rgba(220, 38, 38, ${baseOpacity})`; 
      case "Medium":
        return `rgba(249, 115, 22, ${baseOpacity})`; 
      case "Light":
        return `rgba(59, 130, 246, ${baseOpacity})`;
      case "VeryLight":
        return `rgba(34, 197, 94, ${baseOpacity})`; 
      case "Silent":
      default:
        return `rgba(156, 163, 175, ${baseOpacity})`; 
    }
  };

  const getHaloColor = () => {
    if (!touchPosition) return "rgba(42, 75, 124, 0.3)";
    
    const intensity = getIntensity(touchPosition.y);
    const ratio = Math.min(Math.max(touchPosition.y / SCREEN_HEIGHT, 0), 1);
    
    if (ratio > 0.7) {
      switch (intensity) {
        case "Heavy":
          return "rgba(220, 20, 60, 0.5)"; 
        case "Medium":
          return "rgba(255, 69, 100, 0.4)"; 
        case "Light":
          return "rgba(255, 105, 135, 0.4)";
        case "VeryLight":
          return "rgba(255, 182, 193, 0.3)"; 
        default:
          return "rgba(156, 163, 175, 0.2)";
      }
    }

    switch (intensity) {
      case "Heavy":
        return "rgba(220, 38, 38, 0.4)";
      case "Medium":
        return "rgba(249, 115, 22, 0.4)"; 
      case "Light":
        return "rgba(59, 130, 246, 0.4)"; 
      case "VeryLight":
        return "rgba(34, 197, 94, 0.3)"; 
      case "Silent":
      default:
        return "rgba(156, 163, 175, 0.2)"; 
    }
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {trail.map((point, index) => {
        const now = Date.now();
        const age = now - point.timestamp;
        const maxAge = 1000; 
        const opacity = Math.max(0, 1 - (age / maxAge));
        const size = 40 + (1 - age / maxAge) * 40; 
        const ratio = Math.min(Math.max(point.y / SCREEN_HEIGHT, 0), 1);
        const isHeartZone = ratio > 0.7;
        
        let trailColor;
        if (isHeartZone) {
          switch (point.intensity) {
            case "Heavy":
              trailColor = `rgba(220, 20, 60, ${opacity * 0.4})`;
              break;
            case "Medium":
              trailColor = `rgba(255, 69, 100, ${opacity * 0.3})`;
              break;
            case "Light":
              trailColor = `rgba(255, 105, 135, ${opacity * 0.3})`;
              break;
            case "VeryLight":
              trailColor = `rgba(255, 182, 193, ${opacity * 0.2})`;
              break;
            default:
              trailColor = `rgba(156, 163, 175, ${opacity * 0.1})`;
          }
        } else {
          trailColor = getTrailColor(point.intensity, opacity);
        }
        
        return (
          <View
            key={`${point.timestamp}-${index}`}
            pointerEvents="none"
            style={[
              styles.trailPoint,
              {
                top: point.y - size / 2,
                left: point.x - size / 2,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: trailColor,
                opacity: opacity,
              },
            ]}
          />
        );
      })}

      {touchPosition && (
        <View
          pointerEvents="none"
          style={[
            styles.halo,
            {
              top: touchPosition.y - 60,
              left: touchPosition.x - 60,
              backgroundColor: getHaloColor(),
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
    shadowColor: "#2A4B7C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  trailPoint: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default VibrationsScreen;