import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Header } from "@/components/Header";
import MascotSpeech from "@/components/MascotSpeech";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

const { width } = Dimensions.get("window");
const STEP_SIZE = 40;
const LINE_WIDTH = (width - 80 - (STEP_SIZE * 5)) / 4;

interface Step {
  id: number;
  title: string;
  description: string;
  instruction: string;
  icon: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "5 choses que je VOIS",
    description: "Regardez autour de vous et identifiez 5 choses que vous pouvez voir",
    instruction: "Prenez le temps d'observer votre environnement. Nommez mentalement ou à voix haute 5 objets, couleurs, ou détails visuels.",
    icon: "👁️",
  },
  {
    id: 2,
    title: "4 choses que je TOUCHE",
    description: "Identifiez 4 textures ou objets que vous pouvez toucher",
    instruction: "Touchez différentes surfaces autour de vous. Sentez la texture de vos vêtements, d'une table, d'un mur...",
    icon: "✋",
  },
  {
    id: 3,
    title: "3 choses que j'ENTENDS",
    description: "Écoutez attentivement et identifiez 3 sons différents",
    instruction: "Fermez les yeux si cela vous aide. Concentrez-vous sur les bruits ambiants, votre respiration, des voix...",
    icon: "👂",
  },
  {
    id: 4,
    title: "2 choses que je SENS",
    description: "Identifiez 2 odeurs ou parfums dans votre environnement",
    instruction: "Respirez profondément et essayez de distinguer différentes odeurs autour de vous.",
    icon: "👃",
  },
  {
    id: 5,
    title: "1 chose que je GOÛTE",
    description: "Concentrez-vous sur un goût dans votre bouche",
    instruction: "Peut-être le goût de votre salive, d'une boisson récente, ou même mâchez un chewing-gum.",
    icon: "👅",
  },
];

type AncrageScreenNavigationProp = StackNavigationProp<RootStackParamList, "Ancrage">;

const AncrageScreen: React.FC = () => {
  const navigation = useNavigation<AncrageScreenNavigationProp>();

  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  const isCompleted = completedSteps.length === steps.length;

  const handleStart = () => {
    setIsStarted(true);
    setCurrentStep(0);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
    } else {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setCompletedSteps(prev => prev.filter(step => step !== currentStep - 1));
    }
  };

  const renderIntroduction = () => (
    <View style={styles.introContainer}>
      <MascotSpeech title="Technique d'Ancrage 5-4-3-2-1" isBig={false} />
      <Text style={styles.introDescription}>
        Cette technique vous aide à vous recentrer dans le moment présent en utilisant vos 5 sens.
        Elle est particulièrement efficace pour gérer l'anxiété et le stress.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Commencer l'exercice</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Étape {currentStep + 1} sur {steps.length}</Text>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepIndicator}>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor: index <= currentStep ? '#8FBAA3' : '#f0f0f0',
                borderColor: index === currentStep ? '#8FBAA3' : '#ddd',
                borderWidth: index === currentStep ? 2 : 1,
              }
            ]}
          >
            <Text style={styles.stepIcon}>{step.icon}</Text>
          </View>
          {index < steps.length - 1 && (
            <View style={[styles.stepLine, { backgroundColor: index < currentStep ? '#8FBAA3' : '#ddd' }]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderCurrentStep = () => {
    if (isCompleted) {
      return (
        <View style={styles.completionContainer}>
          <Text style={styles.completionText}>Vous avez terminé l'exercice d'ancrage.</Text>
          <Text style={styles.completionSubtext}>Prenez un moment pour ressentir cet état de calme.</Text>
          <MascotSpeech title="" isBig={false} />
          <TouchableOpacity style={styles.resetButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.resetButtonText}>Retour au menu principal</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const step = steps[currentStep];
    return (
      <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
          <Text style={styles.stepInstruction}>{step.instruction}</Text>
          <MascotSpeech title="" isBig={false} />
        </View>
      </Animated.View>
    );
  };

  const renderControls = () => {
    if (!isStarted || isCompleted) return null;

    return (
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.controlButton, styles.previousButton]}
          onPress={handlePrevious}
          disabled={currentStep === 0}
        >
          <Text style={[styles.controlButtonText, { opacity: currentStep === 0 ? 0.5 : 1 }]}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === steps.length - 1 ? "Terminer" : "Suivant"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ancrage" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!isStarted ? (
          renderIntroduction()
        ) : (
          <>
            {renderProgressBar()}
            {renderStepIndicator()}
            {renderCurrentStep()}
          </>
        )}
      </ScrollView>
      {renderControls()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { flex: 1, paddingHorizontal: 20 },

  introContainer: { paddingVertical: 20 },
  introDescription: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#2A4B7C',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
  },
  startButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },

  progressContainer: { paddingVertical: 20, alignItems: 'center' },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8FBAA3',
    borderRadius: 3,
  },
  progressText: { fontSize: 14, color: '#666', fontWeight: '500' },

  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  stepIndicator: { flexDirection: 'row', alignItems: 'center' },
  stepCircle: {
    width: STEP_SIZE,
    height: STEP_SIZE,
    borderRadius: STEP_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIcon: { fontSize: 18 },
  stepLine: { width: LINE_WIDTH, height: 2, marginHorizontal: 4 },

  stepContainer: { paddingVertical: 20 },
  stepCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: "#f8f9fa",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A4B7C',
    textAlign: 'center',
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  stepInstruction: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  completionContainer: { alignItems: 'center', paddingVertical: 40 },
  completionText: {
    fontSize: 25,
    color: '#2A4B7C',
    textAlign: 'center',
    marginBottom: 12,
  },
  completionSubtext: {
    fontSize: 18,
    color: '#2A4B7C',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#2A4B7C',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 22,
    marginTop: 20,
  },
  resetButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nextButton: { backgroundColor: '#2A4B7C' },
  controlButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default AncrageScreen;