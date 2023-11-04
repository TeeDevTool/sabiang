import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootRouteParamList } from "../../../App";
import MinimalLayout from "../../layouts/Minimal";
import Filters from "../../components/Filters";
import useFilters from "../../components/Filters/useFilters";
import ItemFields from "../../components/ItemFields";
import { FlatList, ListRenderItemInfo, View, StyleSheet } from "react-native";
import { SECTION_GAP } from "../../helpers/general.helper";
import DATA from "../../data/mockData.json";
import { DataInterface } from "../../common/sharedType";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

const Manage: React.FC<BottomTabScreenProps<RootRouteParamList, "manage">> = () => {
  const { isOpen, ...filterProps } = useFilters();

  const renderItems = React.useCallback(
    ({ item, index }: ListRenderItemInfo<DataInterface>) => {
      return (
        <View style={index > 0 ? styles["margin-top"] : []}>
          <ItemFields checkbox />
        </View>
      );
    },
    [DATA]
  );

  return (
    <MinimalLayout header="Manage items">
      <View style={styles.devider} />
      <View>
        <Filters {...filterProps} />
      </View>
      <FlatList
        style={isOpen ? styles["items-container-min"] : styles["items-container-max"]}
        data={DATA}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles["margin-bottom"]}>
        <View style={[styles["input-inline"], styles["margin-bottom"]]}>
          <View style={styles["button-wrapper"]}>
            <Button
              title="Ditched"
              icon={<Icon name="ditch" width={20} height={20} />}
              paddingX={2}
              paddingY={4}
              fontLevel={3}
              onPress={() => {}}
            />
          </View>
          <View style={styles["button-wrapper"]}>
            <Button
              title="Delete"
              icon={<Icon name="delete" width={20} height={20} />}
              paddingX={2}
              paddingY={4}
              fontLevel={3}
              onPress={() => {}}
            />
          </View>
        </View>
        <Button
          bold
          isGradient
          title="Eaten"
          icon={<Icon name="eat" width={24} height={24} />}
          paddingY={5}
          fontLevel={4}
          onPress={() => {}}
        />
      </View>
    </MinimalLayout>
  );
};

const styles = StyleSheet.create({
  devider: { marginTop: -SECTION_GAP / 2 },
  "margin-top": {
    marginTop: SECTION_GAP,
  },
  "margin-bottom": {
    marginBottom: SECTION_GAP / 1.4,
  },
  "items-container-min": {
    height: "55%",
    marginVertical: SECTION_GAP,
  },
  "items-container-max": {
    height: "60.5%",
    marginVertical: SECTION_GAP,
  },
  "input-inline": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "button-wrapper": {
    width: "35%",
  },
});

export default Manage;
