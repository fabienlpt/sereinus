import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  weight?: "regular" | "medium" | "semiBold" | "bold";
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  style,
  weight = "regular",
  ...props
}) => {
  const fontFamily = {
    regular: "AlbertSans-Regular",
    medium: "AlbertSans-Medium",
    semiBold: "AlbertSans-SemiBold",
    bold: "AlbertSans-Bold",
  }[weight];

  return (
    <RNText style={[{ fontFamily }, style]} {...props}>
      {children}
    </RNText>
  );
};
