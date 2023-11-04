import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootRouteParamList } from "../../../App";
import MinimalLayout from "../../layouts/Minimal";
import { SECTION_GAP } from "../../helpers/general.helper";
import { Colors } from "../../common/palette";
import { DataInterface } from "../../common/sharedType";
import DATA from "../../data/mockData.json";
import { calculateDaysFromNow, parseDateToThaiFormat } from "../../helpers/date.helper";
import Button from "../../components/Button";
import Icon from "../../components/Icon";

const DEFAULT_DETAIL = "-";

interface DetailProps {
  title: string;
  value: string | number;
}

const Detail: React.FC<DetailProps> = ({ title, value }) => {
  return (
    <View style={styles["detail-wrapper"]}>
      <Text style={[styles["detail-item"], styles.topic]}>{`${title}:`}</Text>
      <Text style={styles["detail-item"]}>{value}</Text>
    </View>
  );
};

const Details: React.FC<BottomTabScreenProps<RootRouteParamList, "details">> = () => {
  const [data, setData] = React.useState<DataInterface>();
  const detail = React.useMemo(() => {
    const date = data?.expireDate ? new Date(data.expireDate) : null;
    return {
      "Main category": data?.mainCategory ?? DEFAULT_DETAIL,
      "Sub category": data?.subCategory ?? DEFAULT_DETAIL,
      Tag: data?.tag ?? DEFAULT_DETAIL,
      "EXP date": date ? parseDateToThaiFormat(date) : DEFAULT_DETAIL,
      "Days before EXP": `${date ? calculateDaysFromNow(date) : DEFAULT_DETAIL} days`,
      Amount: data?.amount ?? DEFAULT_DETAIL,
    };
  }, [data]);

  React.useEffect(() => {
    setData(DATA[0]);
  }, []);

  if (!data) return null;

  return (
    <MinimalLayout canGoBack fullwidth header="Item detail">
      <View>
        <Image style={styles.image} source={require("../../../assets/images/test-food.png")} />
      </View>
      <View style={styles.container}>
        <View>
          {Object.keys(detail).map((key) => {
            return (
              <Detail
                key={`detail-${key}`}
                title={key}
                value={detail[key as keyof typeof detail]}
              />
            );
          })}
        </View>
        <View style={styles.inline}>
          <Button
            title="Cancel"
            onPress={() => {}}
            fontLevel={4}
            paddingY={4}
            paddingX={3}
            icon={<Icon name="close" height={26} width={26} />}
          />
          <Button
            bold
            isGradient
            title="Add items"
            onPress={() => {}}
            fontLevel={4}
            paddingY={5}
            paddingX={3}
            icon={<Icon name="correct" height={22} width={22} />}
          />
        </View>
      </View>
    </MinimalLayout>
  );
};

const styles = StyleSheet.create({
  inline: {
    marginTop: SECTION_GAP,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 4 / 3,
  },
  container: {
    padding: SECTION_GAP,
  },
  "detail-wrapper": {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  "detail-item": {
    width: "50%",
    color: Colors.Grey,
    fontFamily: "Quicksand_Regular",
    fontSize: 18,
  },
  topic: {
    fontFamily: "Quicksand_Bold",
  },
});

export default Details;
