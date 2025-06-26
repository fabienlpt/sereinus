import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text } from "./CustomText";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = true,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={require("../../assets/arrow-back.png")}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightSection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftSection: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSection: {
    width: 40,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
});
