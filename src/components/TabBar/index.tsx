import { useCallback, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../../common/palette";
import IconButton from "../IconButton/index.";
import Icon from "../Icon";
import { StatusBar } from "expo-status-bar";

export const TAB_HEIGHT = 50;

type NavIconType = "home" | "date" | "manage" | "urgent";

interface NavButtonProps {
  title: string;
  icon: NavIconType;
  handlePress: () => void;
  first?: boolean;
  last?: boolean;
  active?: boolean;
}

const TabNameMapping = {
  home: "Home",
  urgent: "Urgent",
  date: "EXP Dates",
  manage: "Manage",
  add: "Add",
};

const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const renderMenus = useCallback(() => {
    return state.routes.slice(0, 5).map((tabProps, index) => {
      const isFocused = state.index === index;
      function handlePress() {
        const event = navigation.emit({
          type: "tabPress",
          target: tabProps.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(tabProps.name);
        }
      }

      if (tabProps.name === "add") {
        return (
          <IconButton
            key={`nav-add`}
            handlePress={handlePress}
            icon={<Icon name="add" width={28} height={28} />}
          />
        );
      }

      return (
        <NavButton
          active={isFocused}
          title={TabNameMapping[tabProps.name as keyof typeof TabNameMapping]}
          icon={tabProps.name as NavIconType}
          key={tabProps.key}
          handlePress={handlePress}
        />
      );
    });
  }, [state.index]);

  return (
    <View style={styles.container}>
      <StatusBar style={state.index ? "dark" : "light"} />
      {renderMenus()}
    </View>
  );
};

const NavButton: React.FC<NavButtonProps> = ({ title, handlePress, icon, active }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole="button"
      style={[styles["nav-container"], ...(active ? [styles["nav-active"]] : [])]}
    >
      <Icon name={active ? `${icon}-active` : icon} width={20} height={20} />
      <Text style={[styles.text, ...(active ? [styles["text-active"]] : [])]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: TAB_HEIGHT,
    backgroundColor: Colors.White,
    shadowColor: Colors.OrangePrimary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  "nav-container": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: "100%",
    borderColor: Colors.OrangePrimary,
  },
  "nav-active": {
    borderTopWidth: 3,
  },
  text: {
    fontSize: 11,
    fontFamily: "Quicksand_Regular",
  },
  "text-active": {
    fontFamily: "Quicksand_Bold",
    color: Colors.OrangePrimary,
  },
});

export default TabBar;
