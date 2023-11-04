import React from "react";
import { Animated, Modal, View } from "react-native";
import { Colors } from "../../common/palette";

interface LoaderProps {
  dots?: number;
  color?: string;
  size?: number;
  spacing?: number;
  delay?: number;
}

interface DotProps {
  dynamicSize: Animated.Value;
  size: number;
  spacing: number;
  color: string;
  char: string;
}

const Dot: React.FC<DotProps> = ({ dynamicSize, size, spacing, color, char }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: size,
        width: size / 2,
        // margin: spacing,
      }}
    >
      <Animated.Text
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Pattaya_Regular",
          fontSize: dynamicSize,
          padding: size,
        }}
      >
        {char}
      </Animated.Text>
    </View>
  );
};

const Loader: React.FC<LoaderProps> = ({
  dots = 3,
  delay,
  size = 10,
  spacing = 3,
  color = Colors.OrangePrimary,
}) => {
  const [visible, setVisible] = React.useState(false);
  const word = "Sabiang";

  const getAnimationStyle = React.useCallback(
    (node: Animated.Value, delay: number, size: number) =>
      Animated.sequence([
        Animated.timing(node, {
          toValue: Number(size),
          delay,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(node, {
          toValue: size / 2,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
    []
  );

  const list = Array.from(Array(word.length), () => new Animated.Value(size / 2));

  const run = (nodes: Animated.Value[]) => {
    Animated.parallel(
      nodes.map((node, index) => getAnimationStyle(node, delay ? index * delay : index * 260, size))
    ).start(() => {
      setVisible(!visible);
    });
  };

  run(list);

  return (
    <Modal visible={true} transparent statusBarTranslucent animationType="fade">
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: Colors.BlackTransparent,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {list.map((dSize, index) => (
            <Dot
              key={`dot-${index}`}
              dynamicSize={dSize}
              color={color}
              size={size}
              spacing={spacing}
              char={word[index]}
            />
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Loader;
