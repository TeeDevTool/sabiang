import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationHookProps } from "../../../App";
import Header from "../../components/Header";
import Icon from "../../components/Icon";

interface MinimalLayoutProps {
  children: React.ReactNode;
  header?: string;
  canGoBack?: boolean;
  fullwidth?: boolean;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({
  children,
  header,
  canGoBack,
  fullwidth,
}) => {
  const navigation = useNavigation<NavigationHookProps>();

  const handleBack = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  return (
    <>
      {canGoBack && (
        <TouchableOpacity style={styles.back} onPress={handleBack}>
          <Icon width={30} height={30} name="back" />
        </TouchableOpacity>
      )}
      {header && <Header title={header} />}
      <View style={fullwidth ? [] : styles.container}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
  },
  back: {
    position: "absolute",
    top: "5.7%",
    left: 12,
    zIndex: 1,
  },
});

export default MinimalLayout;
