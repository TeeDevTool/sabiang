import React from "react";
import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  ListRenderItemInfo,
} from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/core";
import MinimalLayout from "../../layouts/Minimal";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import * as ImagePicker from "expo-image-picker";
import {
  ItemDetailsInterface,
  SECTION_GAP,
  defaultItemData,
  randomNumberInRange,
} from "../../helpers/general.helper";
import ItemFields from "../../components/ItemFields";
import { Colors } from "../../common/palette";
import { RootRouteParamList } from "../../../App";

const { width, height } = Dimensions.get("window");

const MAX_HEIGHT = height * 0.62;
const MODAL_WIDTH = width * 0.9;

interface CustomModalProps {
  opened: boolean;
  message: string;
  handlePress: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ opened, message, handlePress }) => {
  return (
    <Modal visible={opened} transparent animationType="fade">
      <View style={styles["modal-screen"]}>
        <View style={styles["modal-container"]}>
          <Text style={styles["modal-message"]}>{message}</Text>
          <Button
            bold
            isGradient
            title="Roger that!"
            onPress={handlePress}
            fontLevel={4}
            paddingY={5}
            icon={<Icon name="smile" height={25} width={25} />}
          />
        </View>
      </View>
    </Modal>
  );
};

const AddItems: React.FC<BottomTabScreenProps<RootRouteParamList, "add">> = ({ navigation }) => {
  const [items, setItem] = React.useState<ItemDetailsInterface[]>([]);
  const [opened, setOpen] = React.useState<boolean>(false);

  const handleOpenImagePicker = React.useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      if (navigation.canGoBack()) navigation.goBack();
      return;
    }

    const newDatas = result.assets?.map((asset) => ({
      ...defaultItemData,
      image: asset.uri,
      id: `${randomNumberInRange(1, 999999)}`,
    }));

    setItem(newDatas);
  }, []);

  const handleClearData = React.useCallback(() => {
    setItem([]);
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  const handleAccept = React.useCallback(() => {
    handleClearData();
    setOpen(false);
  }, [navigation]);

  const renderAddItems = React.useCallback(
    ({ item, index }: ListRenderItemInfo<ItemDetailsInterface>) => (
      <View style={index > 0 ? styles["margin-top"] : []}>
        <ItemFields itemData={item} />
      </View>
    ),
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!items.length) handleOpenImagePicker();

      return () => {};
    }, [items.length])
  );

  return (
    <MinimalLayout header="Add item(s)">
      {items.length > 0 ? (
        <>
          <CustomModal
            message="You have successfully added new items. Let not waste food!"
            opened={opened}
            handlePress={handleAccept}
          />
          <FlatList
            style={styles["item-container"]}
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderAddItems}
            showsVerticalScrollIndicator={false}
          />
          <View
            style={[
              styles.inline,
              {
                marginBottom: SECTION_GAP / 4,
              },
            ]}
          >
            <Text style={styles.total}>Total item:</Text>
            <Text style={styles.amount}>
              {`${items.length} item${items.length > 1 ? "s" : ""}`}
            </Text>
          </View>
          <View
            style={[
              styles.inline,
              {
                marginBottom: SECTION_GAP,
              },
            ]}
          >
            <Text style={styles.total}>Total amount:</Text>
            <Text style={styles.amount}>{`${items.length} pcs.`}</Text>
          </View>
          <View style={styles.inline}>
            <Button
              title="Cancel"
              onPress={handleClearData}
              fontLevel={4}
              paddingY={4}
              paddingX={3}
              icon={<Icon name="close" height={26} width={26} />}
            />
            <Button
              bold
              isGradient
              title="Add items"
              onPress={() => setOpen(true)}
              fontLevel={4}
              paddingY={5}
              paddingX={3}
              icon={<Icon name="correct" height={22} width={22} />}
            />
          </View>
        </>
      ) : null}
    </MinimalLayout>
  );
};

const styles = StyleSheet.create({
  "modal-screen": {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.BlackTransparent,
    justifyContent: "center",
    alignItems: "center",
  },
  "modal-container": {
    backgroundColor: Colors.White,
    width: MODAL_WIDTH,
    height: MODAL_WIDTH / 1.1,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 45,
    justifyContent: "space-between",
  },
  "empty-container": {
    height: "92%",
    justifyContent: "flex-end",
  },
  "item-container": {
    maxHeight: MAX_HEIGHT,
    marginBottom: SECTION_GAP,
    marginTop: 8,
  },
  "margin-top": {
    marginTop: SECTION_GAP,
  },
  total: {
    fontFamily: "Quicksand_Bold",
    fontSize: 18,
    color: Colors.Grey,
  },
  amount: {
    fontFamily: "Quicksand_Regular",
    fontSize: 17.5,
    color: Colors.Grey,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "modal-message": {
    fontSize: 25,
    fontFamily: "Quicksand_Bold",
    textAlign: "center",
  },
});

export default AddItems;
