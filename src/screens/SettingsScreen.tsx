import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Header } from "@/components/Header";

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Paramètres" />

      <View style={styles.content}>
        <Text style={styles.text}>Écran des paramètres</Text>
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
  text: {
    fontSize: 18,
    color: "#2c3e50",
  },
});

export default SettingsScreen;
