import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { CustomButton } from "@/components/CustomButton";

const SettingsScreen: React.FC = () => {
  const handleCrisisMode = () => {
    console.log("Mode crise activé");
  };

  const handleBreathing = () => {
    console.log("Exercice de respiration");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sereinus</Text>
        <Text style={styles.subtitle}>Settings</Text>
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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

export default SettingsScreen;
