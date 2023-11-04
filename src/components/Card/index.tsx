import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ViewStyle,
} from "react-native";
import { generateKey } from "../../helpers/general.helper";
import Button from "../Button";
import { Colors } from "../../common/palette";
import { parseDateToThaiFormat } from "../../helpers/date.helper";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = WINDOW_WIDTH * 0.4;
const THIN_CARD_WIDTH = WINDOW_WIDTH * 0.3;
const FONT_SIZE_COUNTDOWN = WINDOW_HEIGHT > 800 ? 18 : 16;
const FONT_SIZE_MAIN = WINDOW_HEIGHT > 800 ? 16 : 14;
const FONT_SIZE_SUB = WINDOW_HEIGHT > 800 ? 14 : 13;

interface CardProps {
  mainCategory: string;
  subCategory: string;
  tag: string;
  amount?: number;
  thin?: boolean;
  options: ExistingCardProps | ExpiredCardProps;
}
interface ExpiredCardProps {
  type: "expired";
  onRestock: () => void;
}

interface ExistingCardProps {
  type: "existing";
  expireDate: Date;
  expireCount: number;
  onPress: () => void;
  onDitched: () => void;
  onEaten: () => void;
}

interface CardContainerProps {
  children: React.ReactNode;
  propsStyles?: ViewStyle[];
  onPress?: () => void;
}

const CardPressable: React.FC<CardContainerProps> = ({ children, onPress, propsStyles = [] }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[...propsStyles]}>
      {children}
    </TouchableOpacity>
  );
};

const CardUnpressable: React.FC<CardContainerProps> = ({ children, propsStyles = [] }) => {
  return <View style={[...propsStyles]}>{children}</View>;
};

const Card: React.FC<CardProps> = ({
  thin,
  mainCategory,
  subCategory,
  tag,
  options,
  amount = 2,
}) => {
  const Container = React.useMemo(
    () => (options.type === "expired" ? CardUnpressable : CardPressable),
    [options.type]
  );

  const renderCardDetail = React.useCallback(() => {
    const categories = [
      <Text
        key={`main-category-${options.type}--${generateKey()}`}
        style={styles["text-main"]}
        numberOfLines={1}
      >
        {mainCategory}
      </Text>,
      <Text
        key={`sub-category-${options.type}--${generateKey()}`}
        style={styles["text-sub"]}
        numberOfLines={1}
      >
        {subCategory}
      </Text>,
    ];

    switch (options.type) {
      case "existing":
        const isUrgent = options.expireCount < 7;
        return (
          <>
            <Text
              style={[styles["text-countdown"], ...(isUrgent ? [styles["text-urgent"]] : [])]}
            >{`${options.expireCount} day${options.expireCount > 1 ? "s" : ""} left${
              isUrgent ? "!" : ""
            }`}</Text>
            {categories}
            <View style={[styles["action-container"], styles["action-container-existing"]]}>
              <Button
                title="Ditched"
                fontLevel={1}
                paddingX={thin ? 0.5 : 1}
                onPress={options.onDitched}
              />
              <Button
                title="Eaten"
                fontLevel={1}
                paddingX={thin ? 0.5 : 3}
                paddingY={2.5}
                isGradient
                bold
                onPress={options.onEaten}
              />
            </View>
          </>
        );
      case "expired":
        return (
          <>
            {categories}
            <View style={styles["action-container"]}>
              <Button
                title="Restock"
                fontLevel={1}
                paddingY={2.5}
                isGradient
                bold
                onPress={() => {}}
              />
            </View>
          </>
        );
      default:
        return;
    }
  }, [options, thin]);

  return (
    <Container
      onPress={options.type === "existing" ? options.onPress : undefined}
      propsStyles={[styles.container, styles[`size${thin ? "-thin" : ""}`]]}
    >
      <View style={styles["image-container"]}>
        <Image
          style={[styles["image-layout"], styles[`image${thin ? "-thin" : ""}`]]}
          source={require("../../../assets/images/test-food.png")}
        />
        <Text style={[styles.badge, styles.tag]}>{tag}</Text>
        {amount ? <Text style={[styles.badge, styles.amount]}>{`x${amount}`}</Text> : null}
        {options.type !== "expired" ? (
          <Text style={[styles.badge, styles.date]}>
            {parseDateToThaiFormat(options.expireDate)}
          </Text>
        ) : null}
      </View>
      <View style={styles["detail-container"]}>{renderCardDetail()}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  "action-container": {
    marginTop: 5,
  },
  "action-container-existing": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "detail-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: 2,
  },
  "image-container": {
    position: "relative",
  },
  size: {
    width: CARD_WIDTH,
  },
  "size-thin": {
    width: THIN_CARD_WIDTH,
  },
  "image-layout": {
    width: "100%",
    height: 125,
    borderRadius: 12,
    marginBottom: 3,
    resizeMode: "cover",
  },
  image: {
    height: 125,
  },
  "image-thin": {
    // thin version should be square
    height: THIN_CARD_WIDTH,
  },
  "text-countdown": {
    fontSize: FONT_SIZE_COUNTDOWN,
    fontFamily: "Quicksand_Bold",
    color: Colors.Grey,
  },
  "text-main": {
    fontSize: FONT_SIZE_MAIN,
    fontFamily: "Quicksand_Medium",
    color: Colors.Grey,
  },
  "text-sub": {
    fontSize: FONT_SIZE_SUB,
    fontFamily: "Quicksand_Medium",
    color: Colors.Grey,
  },
  "text-urgent": {
    color: "red",
  },
  tag: {
    paddingBottom: 2,
    top: 5,
    left: 5,
    color: Colors.Grey,
    backgroundColor: Colors.WhiteTransparent,
  },
  amount: {
    fontFamily: "Quicksand_Bold",
    paddingBottom: 2,
    top: 5,
    right: 5,
    color: Colors.Grey,
    backgroundColor: Colors.White,
  },
  date: {
    paddingBottom: 3,
    bottom: 8,
    left: 5,
    color: Colors.White,
    backgroundColor: Colors.BlackTransparent,
  },
  badge: {
    fontFamily: "Quicksand_Medium",
    fontSize: FONT_SIZE_MAIN,
    paddingHorizontal: 8,
    paddingTop: 1,
    borderRadius: 5,
    position: "absolute",
  },
});

export default React.memo(Card);
