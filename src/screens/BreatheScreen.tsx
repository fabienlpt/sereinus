import CustomButton from "@/components/CustomButton";
import { Header } from "@/components/Header";
import MascotSpeech from "@/components/MascotSpeech";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Text } from "@/components/CustomText";

type BreathingPhase = "inhale" | "hold" | "exhale" | "pause";

const PHASE_DURATIONS = {
  inhale: 4,
  hold: 7,
  exhale: 8,
  pause: 3,
};

const PHASE_MESSAGES = {
  inhale: "Inspirez doucement par le nez",
  hold: "Retenez votre respiration",
  exhale: "Expirez lentement par la bouche",
  pause: "Préparez-vous pour le prochain cycle",
};

const BreatheScreen: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>("inhale");
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATIONS.inhale);
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseStartTime = useRef<number>(Date.now());

  useEffect(() => {
    if (isActive) {
      const updateTimer = () => {
        const elapsed = (Date.now() - phaseStartTime.current) / 1000;
        const remaining = Math.max(0, PHASE_DURATIONS[currentPhase] - elapsed);

        if (remaining > 0) {
          setTimeLeft(remaining);
          intervalRef.current = setTimeout(updateTimer, 16);
        } else {
          setTimeLeft(0);
          moveToNextPhase();
        }
      };

      updateTimer();
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, currentPhase]);

  const moveToNextPhase = () => {
    let nextPhase: BreathingPhase;

    switch (currentPhase) {
      case "inhale":
        nextPhase = "hold";
        break;
      case "hold":
        nextPhase = "exhale";
        break;
      case "exhale":
        nextPhase = "pause";
        break;
      case "pause":
        nextPhase = "inhale";
        setCycleCount((prev) => prev + 1);
        break;
      default:
        nextPhase = "inhale";
    }

    setCurrentPhase(nextPhase);
    phaseStartTime.current = Date.now();
    setTimeLeft(PHASE_DURATIONS[nextPhase]);
  };

  const togglePause = () => {
    if (!isActive) {
      phaseStartTime.current =
        Date.now() - (PHASE_DURATIONS[currentPhase] - timeLeft) * 1000;
    }
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.ceil(seconds);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgress = () => {
    const totalDuration = PHASE_DURATIONS[currentPhase];
    const elapsed = totalDuration - timeLeft;
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
  };

  const getCircumference = () => {
    const radius = 80;
    return 2 * Math.PI * radius;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Respiration" />

      <View style={styles.content}>
        <MascotSpeech title={PHASE_MESSAGES[currentPhase]} isBig={false} />

        <View style={styles.timerContainer}>
          <View style={styles.circularTimer}>
            <Svg width={200} height={200} style={styles.circularProgress}>
              <Circle
                cx={100}
                cy={100}
                r={80}
                stroke="#e0e0e0"
                strokeWidth={20}
                fill="transparent"
              />
              <Circle
                cx={100}
                cy={100}
                r={80}
                stroke="#8FBAA3"
                strokeWidth={20}
                fill="transparent"
                strokeDasharray={getCircumference()}
                strokeDashoffset={
                  getCircumference() -
                  (getProgress() / 100) * getCircumference()
                }
                transform="rotate(-90 100 100)"
              />
            </Svg>
            <View style={styles.timerText}>
              <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.controls}>
          <CustomButton
            title={isActive ? "Pause" : "Démarrer"}
            onPress={togglePause}
            style={styles.button}
          />
        </View>
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
  timerContainer: {
    alignItems: "center",
    marginVertical: 80,
  },
  circularTimer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  circularProgress: {
    position: "absolute",
  },
  timerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2A4B7C",
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2A4B7C",
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    minWidth: 120,
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#2A4B7C",
  },
  pauseButton: {
    backgroundColor: "#f39c12",
  },
  resetButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BreatheScreen;
