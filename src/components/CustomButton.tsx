import React from "react";
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { Text } from "./CustomText";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ImageSourcePropType | React.ReactNode;
  iconPosition?: "left" | "right";
  style?: ViewStyle | ViewStyle[];
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress();
  };

  const renderIcon = () => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      return icon;
    }

    return <Image source={icon as ImageSourcePropType} style={styles.icon} />;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.base, disabled && styles.disabled, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          {iconPosition === "left" && renderIcon()}
          <Text style={styles.title} weight="bold">
            {title}
          </Text>
          {iconPosition === "right" && renderIcon()}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A4B7C",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;
