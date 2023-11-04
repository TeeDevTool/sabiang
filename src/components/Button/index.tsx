import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, ViewStyle, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../common/palette";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactElement;
  width?: "full" | "half";
  fontLevel?: 0.5 | 1 | 2 | 3 | 4 | 5 | 6;
  paddingX?: -1 | 0.5 | 1 | 2 | 3 | 4 | 5;
  paddingY?: 1 | 2.5 | 2 | 3 | 4 | 5;
  isGradient?: boolean;
  shadow?: boolean;
  bold?: boolean;
}

interface ButtonContainerProps {
  children: React.ReactNode;
  propsStyles?: ViewStyle[];
}

const GradientContainer: React.FC<ButtonContainerProps> = ({ children, propsStyles = [] }) => (
  <LinearGradient
    colors={[Colors.OrangePrimary, Colors.Peach]}
    start={{ x: 0, y: 0 }}
    end={{ x: 0.7, y: 1 }}
    style={[styles.background, ...propsStyles]}
  >
    {children}
  </LinearGradient>
);

const PlainContainer: React.FC<ButtonContainerProps> = ({ children, propsStyles = [] }) => (
  <View style={[styles.background, styles["background-plain"], ...propsStyles]}>{children}</View>
);

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  icon,
  width,
  fontLevel,
  paddingX,
  paddingY,
  isGradient,
  shadow,
  bold,
}) => {
  const Container = isGradient ? GradientContainer : PlainContainer;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        ...(shadow ? [styles["container-gradient"]] : []),
        ...(width ? [styles[`${width}-width`]] : []),
      ]}
      onPress={onPress}
    >
      <Container
        propsStyles={[
          styles["default-padding"],
          ...(paddingX ? [styles[`padding-x-${paddingX}`]] : []),
          ...(paddingY ? [styles[`padding-y-${paddingY}`]] : []),
        ]}
      >
        {icon}
        <Text
          style={[
            styles.text,
            isGradient ? styles["text-gradient"] : styles["text-plain"],
            ...(fontLevel ? [styles[`font-level-${fontLevel}`]] : []),
            ...(icon ? [styles["has-icon"]] : []),
            ...(bold ? [styles["font-bold"]] : []),
          ]}
        >
          {title}
        </Text>
      </Container>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // container
  container: {
    borderRadius: 50,
    overflow: "hidden",
  },
  "container-gradient": {
    shadowColor: Colors.OrangePrimary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  "full-width": {
    width: "100%",
  },
  "half-width": {
    width: "50%",
  },
  // background
  background: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  "background-plain": {
    borderColor: Colors.Orange,
    borderWidth: 1,
  },
  "default-padding": {
    paddingVertical: 3,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  "padding-x--1": {
    paddingHorizontal: 0,
  },
  "padding-x-0.5": {
    paddingHorizontal: 6,
  },
  "padding-x-1": {
    paddingHorizontal: 10,
  },
  "padding-x-2": {
    paddingHorizontal: 16,
  },
  "padding-x-3": {
    paddingHorizontal: 20,
  },
  "padding-x-4": {
    paddingHorizontal: 24,
  },
  "padding-x-5": {
    paddingHorizontal: 28,
  },
  "padding-y-1": {
    paddingVertical: 0,
  },
  "padding-y-2": {
    paddingVertical: 3,
  },
  "padding-y-2.5": {
    paddingVertical: 3.75,
  },
  "padding-y-3": {
    paddingVertical: 6,
  },
  "padding-y-4": {
    paddingVertical: 9,
  },
  "padding-y-5": {
    paddingVertical: 12,
  },
  // text
  text: {
    fontFamily: "Quicksand_Medium",
    textAlignVertical: "center",
  },
  "text-plain": {
    color: Colors.Grey,
  },
  "text-gradient": {
    color: Colors.White,
  },
  "has-icon": {
    marginLeft: 8,
  },
  "font-bold": {
    fontFamily: "Quicksand_Bold",
  },
  "font-level-0.5": {
    lineHeight: 9.5,
    fontSize: 9,
  },
  "font-level-1": {
    lineHeight: 14,
    fontSize: 12,
  },
  "font-level-2": {
    lineHeight: 16,
    fontSize: 14,
  },
  "font-level-3": {
    lineHeight: 19,
    fontSize: 16,
  },
  "font-level-4": {
    lineHeight: 21.5,
    fontSize: 18,
  },
  "font-level-5": {
    lineHeight: 22,
    fontSize: 20,
  },
  "font-level-6": {
    lineHeight: 24,
    fontSize: 22,
  },
  pressed: {
    opacity: 0.8,
  },
});

export default React.memo(CustomButton);
