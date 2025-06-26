import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "./CustomText";

interface MascotSpeechProps {
  title: string;
  isBig?: boolean;
}

export const MascotSpeech: React.FC<MascotSpeechProps> = ({
  title,
  isBig = false,
}) => {
  return (
    <View style={[styles.base]}>
      <Text weight="bold" style={styles.text}>
        {title}
      </Text>
      <Image source={require("../../assets/trait.png")} style={styles.trait} />
      {isBig ? (
        <Image
          source={require("../../assets/mascotte_onboarding.png")}
          style={[styles.mascot, styles.mascotBig]}
        />
      ) : (
        <Image
          source={require("../../assets/mascotte.png")}
          style={styles.mascot}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "#2A4B7C",
    textAlign: "center",
    marginBottom: 12,
  },
  trait: {
    width: 180,
    height: 12,
    marginBottom: 4,
  },
  mascot: {
    width: 142,
    height: 142,
  },
  mascotBig: {
    minWidth: 392,
    height: 220,
  },
});

export default MascotSpeech;
