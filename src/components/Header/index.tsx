import { StyleSheet, Text } from "react-native";
import { Colors } from "../../common/palette";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Text style={styles.header}>{title}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: "Quicksand_Bold",
    textAlign: "center",
    paddingTop: "10%",
    marginBottom: 15,
    color: Colors.Grey,
  },
});

export default Header;
