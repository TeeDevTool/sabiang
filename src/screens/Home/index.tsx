import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import MainLayout, { DASHBOARD_HEIGHT } from "../../layouts/Main";
import { TAB_HEIGHT } from "../../components/TabBar";
import { Colors } from "../../common/palette";
import { calculateDaysFromNow } from "../../helpers/date.helper";
import { DataInterface } from "../../common/sharedType";
import { RootRouteParamList, NavigationHookProps } from "../../../App";
import datas from "../../data/mockData.json";
import { SECTION_GAP, createPairDatas } from "../../helpers/general.helper";
import Filters from "../../components/Filters";
import useFilters from "../../components/Filters/useFilters";
import NoData from "../../components/NoData/index.";
import Loader from "../../components/Loader";

const { height, width } = Dimensions.get("window");
const CARD_GAP = width * 0.06;
const PADDING = 20;
const MINIMUM_HEIGHT_SCREEN = Math.max(height - TAB_HEIGHT - DASHBOARD_HEIGHT, 0);
const MAXIMUM_URGENT_CARD = 8;

function getKey({ id }: DataInterface) {
  return id;
}

const MostUrgentItems: React.FC = () => {
  const navigation = useNavigation<NavigationHookProps>();

  const renderUrgentItems = React.useCallback(
    ({ item, index }: ListRenderItemInfo<DataInterface>) => {
      const date = new Date(item.expireDate);
      return (
        <View style={{ marginLeft: index ? CARD_GAP : 0 }}>
          <Card
            thin
            tag={item.tag}
            mainCategory={item.mainCategory}
            subCategory={item.subCategory}
            options={{
              type: "existing",
              expireDate: date,
              expireCount: calculateDaysFromNow(date),
              onPress: () => navigation.navigate("details", { id: item.id }),
              onDitched: () => {},
              onEaten: () => {},
            }}
          />
        </View>
      );
    },
    [datas]
  );

  return (
    <>
      <View style={styles["title-container"]}>
        <Text style={styles.title}>Most urgent items</Text>
        <TouchableOpacity onPress={() => navigation.navigate("urgent")}>
          <Text style={styles.more}>
            {`See all  `}
            <Icon name="more" width={6} height={11} />
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        style={styles["urgent-container"]}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={datas.length > 2}
        data={datas.slice(0, MAXIMUM_URGENT_CARD)}
        keyExtractor={getKey}
        renderItem={renderUrgentItems}
        ListEmptyComponent={
          <View style={{ width: width - PADDING * 2 }}>
            <NoData />
          </View>
        }
      />
    </>
  );
};

const SearchItems: React.FC = () => {
  const filterProps = useFilters();

  const pairDatas = React.useMemo(() => createPairDatas(datas), [datas]);

  const renderItems = React.useCallback(
    () =>
      pairDatas.length ? (
        pairDatas.map((items, index) => (
          <View key={`item-container-${index}`} style={styles["item-container"]}>
            {items.map((item) => {
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
        ))
      ) : (
        <NoData propsStyles={[styles.gap]} />
      ),
    [datas]
  );

  return (
    <View style={{ marginBottom: SECTION_GAP }}>
      <View style={styles["title-container"]}>
        <Text style={styles.title}>Search your items</Text>
      </View>
      <Filters {...filterProps} />
      {renderItems()}
    </View>
  );
};

const Home: React.FC<BottomTabScreenProps<RootRouteParamList, "home">> = () => {
  return (
    <MainLayout eaten={8} thrown={100}>
      <View style={styles.container}>
        <MostUrgentItems />
        <SearchItems />
        {/* <Loader dots={3} size={40} delay={100} /> */}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    minHeight: MINIMUM_HEIGHT_SCREEN,
  },
  "urgent-container": {
    flexGrow: 0,
    marginVertical: SECTION_GAP,
  },
  "categories-container": {
    marginTop: SECTION_GAP / 1.5,
    flexGrow: 0,
  },
  "item-container": {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
    marginTop: SECTION_GAP,
  },
  title: {
    color: Colors.Grey,
    fontFamily: "Quicksand_Bold",
    fontSize: 21,
  },
  "title-container": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  more: {
    fontFamily: "Quicksand_Regular",
    color: Colors.Grey,
    fontSize: 15,
    marginTop: 4,
  },
  gap: {
    marginTop: SECTION_GAP / 1.5,
  },
});

export default Home;
