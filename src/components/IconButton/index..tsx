import { TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../common/palette";

const DEFAULT_SIZE = 40;

interface IconButtomProps {
  icon: React.ReactElement;
  size?: number;
  noBackground?: boolean;
  handlePress: () => void;
}

const IconButton: React.FC<IconButtomProps> = ({ icon, handlePress, size, noBackground }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        {
          width: size ?? DEFAULT_SIZE,
          height: size ?? DEFAULT_SIZE,
          borderRadius: size ? size / 2 : DEFAULT_SIZE / 2,
          backgroundColor: noBackground ? Colors.White : Colors.OrangePrimary,
        },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
});

export default IconButton;
