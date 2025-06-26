import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Switch,
} from "react-native";
import { Text } from "./CustomText";

interface CustomToggleProps {
  title: string;
  description?: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  style?: ViewStyle | ViewStyle[];
}

export const CustomToggle: React.FC<CustomToggleProps> = ({
  title,
  description,
  value,
  onToggle,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onToggle(!value)}
      style={[style]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#767577", true: "#8FBAA3" }}
          thumbColor={"#F5F5F5"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    color: "#2A4B7C",
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: "#7f8c8d",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 18,
  },
});

export default CustomToggle;
