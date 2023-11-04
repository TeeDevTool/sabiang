import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../common/palette";
import Icon from "../../components/Icon";

const { width, height } = Dimensions.get("window");

const BOX_WIDTH = width * 0.4;
const BOX_HEIGHT = height * 0.177;
const GRADIENT_HEIGHT = height * 0.27;
const GRADIENT_BASE = -height * 0.026;
export const DASHBOARD_HEIGHT = height * 0.3;

interface MainLayoutProps {
  children: React.ReactNode;
  eaten: number;
  thrown: number;
}

interface BoxItemProps {
  title: string;
  count: number;
}

const BoxItem: React.FC<BoxItemProps> = ({ title, count }) => {
  return (
    <View style={styles["box-container"]}>
      <View style={[styles.box, styles["box-bg"]]} />
      <TouchableOpacity style={styles.box}>
        <Text style={styles["text-title"]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles["text-count"]}>{count}</Text>
        <Text style={styles["text-items"]}>
          {`pcs.  `}
          <Icon name="more" width={8} height={15} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, eaten, thrown }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <LinearGradient
        colors={[Colors.OrangePrimary, Colors.Peach]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.dashboard}>
        <Text style={styles["dashboard-title"]}>Dashboard</Text>
        <View style={styles["dashboard-container"]}>
          <BoxItem title="Eaten" count={eaten} />
          <BoxItem title="Thrown away" count={thrown} />
        </View>
      </View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  gradient: {
    width: "120%",
    height: GRADIENT_HEIGHT,
    top: GRADIENT_BASE,
    left: "-10%",
    position: "absolute",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  dashboard: {
    height: DASHBOARD_HEIGHT,
    paddingTop: "10%",
    paddingHorizontal: 15,
  },
  "dashboard-title": {
    marginBottom: 15,
    fontSize: 24,
    fontFamily: "Quicksand_Bold",
    color: Colors.White,
  },
  "dashboard-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  "box-container": {
    position: "relative",
    height: BOX_HEIGHT,
    width: BOX_WIDTH,
  },
  box: {
    height: BOX_HEIGHT,
    width: BOX_WIDTH,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 15,
    backgroundColor: Colors.OrangeLight,
    justifyContent: "space-between",
    position: "absolute",
  },
  "box-bg": {
    backgroundColor: Colors.OrangeBG,
    position: "absolute",
  },
  "text-items": {
    lineHeight: 14,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Quicksand_Regular",
    color: Colors.Grey,
  },
  "text-title": {
    lineHeight: 16,
    fontSize: 16,
    textAlign: "left",
    fontFamily: "Quicksand_Medium",
    color: Colors.Grey,
  },
  "text-count": {
    lineHeight: 60,
    fontSize: 50,
    textAlign: "center",
    fontFamily: "Quicksand_Bold",
    color: Colors.OrangePrimary,
  },
});

export default MainLayout;
