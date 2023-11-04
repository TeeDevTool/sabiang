import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../common/palette";

interface BadgeProps {
  title: string;
  type: "main" | "sub";
  onPress: () => void;
  margin?: 0 | 1 | 2 | 3 | 4 | 5;
  active?: boolean;
  selected?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ title, type, active, selected, margin = 0, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container-${active ? "active" : "default"}`],
        styles[`container-${type}`],
        styles[`margin-${margin}`],
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text-${active ? "active" : "default"}`],
          ...(selected ? [styles["text-selected"]] : []),
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    borderRadius: 50,
  },
  "container-default": {
    backgroundColor: Colors.OrangeLight,
  },
  "container-active": {
    backgroundColor: Colors.OrangePrimary,
  },
  "container-main": {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  "container-sub": {
    paddingHorizontal: 11,
    paddingVertical: 3,
  },
  text: {
    fontFamily: "Quicksand_Medium",
  },
  "text-default": {
    color: Colors.OrangePrimary,
  },
  "text-active": {
    color: Colors.OrangeLight,
  },
  "text-selected": {
    textDecorationLine: "underline",
  },
  "margin-0": {
    marginRight: 0,
  },
  "margin-1": {
    marginRight: 5,
  },
  "margin-2": {
    marginRight: 10,
  },
  "margin-3": {
    marginRight: 15,
  },
  "margin-4": {
    marginRight: 20,
  },
  "margin-5": {
    marginRight: 25,
  },
});

export default React.memo(Badge);
