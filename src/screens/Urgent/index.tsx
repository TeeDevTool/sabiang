import React, { useCallback } from "react";
import { SectionList, SectionListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import MinimalLayout from "../../layouts/Minimal";
import { RootRouteParamList } from "../../../App";
import Header from "../../components/Header";
import data from "../../data/mockData.json";
import { SECTION_GAP, createPairDatas } from "../../helpers/general.helper";
import { calculateDaysFromNow } from "../../helpers/date.helper";
import Card from "../../components/Card";
import { Colors } from "../../common/palette";
import { DataInterface } from "../../common/sharedType";
import NoData from "../../components/NoData/index.";
import Button from "../../components/Button";

const Urgent: React.FC<BottomTabScreenProps<RootRouteParamList, "urgent">> = () => {
  const MOCK_DATA = [
    { title: "Expired", data: [...createPairDatas(data.slice(0, 3))] },
    { title: "Expires in 3 days", data: [] },
    { title: "Expires in this week", data: [...createPairDatas(data)] },
    { title: "Expires in this month", data: [...createPairDatas(data)] },
  ];

  const renderCards = useCallback((items: SectionListRenderItemInfo<DataInterface[]>) => {
    return (
      <View key={`item-container-${items.index}`} style={[styles["item-container"], styles.inline]}>
        {items.item.map((item) => {
          if (!item) return null;

          const date = new Date(item.expireDate);

          return (
            <Card
              key={item.id}
              tag={item.tag}
              mainCategory={item.mainCategory}
              subCategory={item.subCategory}
              options={{
                type: "existing",
                expireDate: date,
                expireCount: calculateDaysFromNow(date),
                onPress: () => {
                  console.log("pressed");
                },
                onDitched: () => {
                  console.log("press ditch");
                },
                onEaten: () => {},
              }}
            />
          );
        })}
      </View>
    );
  }, []);

  return (
    <MinimalLayout>
      <SectionList
        sections={MOCK_DATA}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Header title="Urgent item(s)" />}
        keyExtractor={(pairItem, index) => pairItem[0].id + index}
        renderItem={renderCards}
        renderSectionHeader={({ section: { title } }) => {
          const isExpiredSection = (title as string)?.toLowerCase() === "expired";
          return (
            <View style={[styles["section-header-container"], styles.inline]}>
              <Text style={styles["section-header"]}>{title}</Text>
              {isExpiredSection ? (
                <Button title="Ditch all" paddingX={1} onPress={() => {}} />
              ) : null}
            </View>
          );
        }}
        renderSectionFooter={({ section }) => {
          if (section.data.length == 0) {
            return <NoData propsStyles={[styles.gap]} />;
          }
          return null;
        }}
      />
    </MinimalLayout>
  );
};

const styles = StyleSheet.create({
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "item-container": {
    paddingHorizontal: "2%",
    marginBottom: SECTION_GAP,
  },
  "section-header-container": {
    marginBottom: SECTION_GAP,
  },
  "section-header": {
    fontSize: 20,
    fontFamily: "Quicksand_Bold",
    color: Colors.Grey,
  },
  gap: {
    marginBottom: SECTION_GAP / 2,
  },
});

export default Urgent;
