import { Image, StyleSheet, View, Dimensions, Text, ViewStyle } from "react-native";
import { Colors } from "../../common/palette";

const { height } = Dimensions.get("window");
const IMAGE_WIDTH = height * 0.13;
const IMAGE_HEIGHT = height * 0.12;

interface NoDataProps {
  propsStyles?: ViewStyle[];
}

const NoData: React.FC<NoDataProps> = ({ propsStyles }) => {
  return (
    <View style={[styles.container, ...(propsStyles ?? [])]}>
      <Image
        source={require("../../../assets/images/no-data.png")}
        fadeDuration={0}
        style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
      />
      <Text style={styles.message}>No supplies here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    paddingVertical: 2,
    fontFamily: "Quicksand_Bold",
    color: Colors.GreyLight,
  },
});

export default NoData;
