import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";
import { Colors } from "../../common/palette";
import { Picker } from "@react-native-picker/picker";
import { tag, category, mainCategoryMapping } from "../../data/masterData";
import Icon from "../Icon";
import { parseDateToThaiFormat } from "../../helpers/date.helper";
import { ItemDetailsInterface, defaultItemData } from "../../helpers/general.helper";

const { height } = Dimensions.get("window");

const ROW_HEIGHT = height * 0.04;
const IMAGE_HEIGHT = ROW_HEIGHT * 3 + 30;

interface ItemFieldsProps {
  itemData?: ItemDetailsInterface;
  checkbox?: boolean;
}

interface CustomPickerProps {
  title: string;
  fieldName: string;
  items: ItemInterface[];
  selected: string;
  width?: number;
  onSelect: (value: string, key: string) => void;
}

interface ItemInterface {
  label: string;
  value: string;
}

interface DatePickerProps {
  title: string;
  value: Date | null;
  fieldName: string;
  width?: number;
  onChange: (value: Date, key: string) => void;
}

interface NumberInputProps {
  value: number;
  fieldName: string;
  width?: number;
  onChange: (value: number, key: string) => void;
}

const ItemFields: React.FC<ItemFieldsProps> = ({ checkbox, itemData }) => {
  const [itemDetails, setItemDetails] = React.useState<ItemDetailsInterface>({
    ...defaultItemData,
    ...itemData,
  });

  const mainCategoryItems = React.useMemo(
    () =>
      Object.keys(mainCategoryMapping).map((key) => ({
        label: mainCategoryMapping[key as keyof typeof mainCategoryMapping],
        value: key,
      })),
    [mainCategoryMapping]
  );

  const subCategoryItems = React.useMemo(
    () =>
      itemDetails.mainCategory
        ? category[itemDetails.mainCategory as keyof typeof category].map((item) => ({
            label: item,
            value: item,
          }))
        : [],
    [itemDetails.mainCategory, category]
  );

  const tagItems = React.useMemo(() => tag.map((item) => ({ label: item, value: item })), [tag]);

  const handleValueChange = React.useCallback(
    (value: string | number | Date | boolean, key: string) => {
      setItemDetails((currentState) => ({
        ...currentState,
        [key]: value,
        ...(key === "mainCategory" ? { subCategory: "" } : {}),
      }));
    },
    [itemDetails]
  );

  return (
    <View style={styles.container}>
      <View style={styles["inner-container"]}>
        <View style={styles["image-container"]}>
          <Image
            style={styles.image}
            source={
              itemDetails.image
                ? { uri: itemDetails.image }
                : require("../../../assets/images/test-food.png")
            }
          />
          {checkbox && (
            <View style={[styles["checkbox-container"], styles.checkbox]}>
              <Checkbox
                style={styles.checkbox}
                value={itemDetails.selected}
                color={Colors.OrangePrimary}
                onValueChange={(val) => handleValueChange(val, "selected")}
              />
            </View>
          )}
        </View>
        <View style={styles["input-group"]}>
          <View style={styles["input-inline"]}>
            <CustomPicker
              width={51}
              title="Main category"
              fieldName="mainCategory"
              items={mainCategoryItems}
              selected={itemDetails.mainCategory}
              onSelect={handleValueChange}
            />
            <CustomPicker
              width={41}
              title="Tag"
              fieldName="tag"
              items={tagItems}
              selected={itemDetails.tag}
              onSelect={handleValueChange}
            />
          </View>
          <CustomPicker
            title="Sub category"
            fieldName="subCategory"
            items={subCategoryItems}
            selected={itemDetails.subCategory}
            onSelect={handleValueChange}
          />
          <View style={styles["input-inline"]}>
            <DatePicker
              width={51}
              fieldName="exp"
              title="EXP/BBE"
              value={itemDetails.exp}
              onChange={handleValueChange}
            />
            <NumberInput
              width={41}
              value={itemDetails.amount}
              fieldName="amount"
              onChange={handleValueChange}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const NumberInput: React.FC<NumberInputProps> = ({ value, fieldName, width, onChange }) => {
  const handleChange = React.useCallback((val: string) => {
    onChange(parseInt(val || "0"), fieldName);
  }, []);

  const handleIncreaseOrDecrease = React.useCallback(
    (mode: "increase" | "decrease") => {
      switch (mode) {
        case "increase":
          onChange(value + 1, fieldName);
          break;
        case "decrease":
          onChange(value - 1, fieldName);
          break;
        default:
          break;
      }
    },
    [value]
  );

  const incrementDisabled = React.useMemo(() => value > 98, [value]);

  const decrementDisabled = React.useMemo(() => value < 1, [value]);

  return (
    <View
      style={[
        ...(value > 0 ? [styles["input-button-container-active"]] : []),
        styles["input-button-container"],
        styles["input-inline"],
        styles["number-container"],
        { width: `${width ?? 100}%` },
      ]}
    >
      <TouchableOpacity
        style={decrementDisabled ? styles.disabled : []}
        onPress={() => handleIncreaseOrDecrease("decrease")}
        disabled={decrementDisabled}
      >
        <Text style={styles["math-button"]}>-</Text>
      </TouchableOpacity>
      <TextInput
        value={value.toString()}
        style={[styles["picker-placeholder"], ...(value ? [styles["picker-selected"]] : [])]}
        textAlign="center"
        inputMode="numeric"
        cursorColor={Colors.OrangePrimary}
        selectionColor={Colors.OrangePrimary}
        maxLength={2}
        onChangeText={handleChange}
      />
      <TouchableOpacity
        style={incrementDisabled ? styles.disabled : []}
        onPress={() => handleIncreaseOrDecrease("increase")}
        disabled={incrementDisabled}
      >
        <Text style={styles["math-button"]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const DatePicker: React.FC<DatePickerProps> = ({ title, value, fieldName, width, onChange }) => {
  const [opened, setOpen] = React.useState<boolean>(false);

  const handleChange = React.useCallback((event: DateTimePickerEvent, date?: Date) => {
    setOpen(false);

    if (date) {
      onChange(date, fieldName);
    }
  }, []);

  return (
    <View
      style={[
        { width: `${width ?? 100}%` },
        styles["input-button-container"],
        ...(value ? [styles["input-button-container-active"]] : []),
      ]}
    >
      <TouchableOpacity style={styles["input-button"]} onPress={() => setOpen(true)}>
        <Text
          numberOfLines={1}
          style={[styles["picker-placeholder"], ...(value ? [styles["picker-selected"]] : [])]}
        >
          {value ? parseDateToThaiFormat(value) : title}
        </Text>
      </TouchableOpacity>
      {opened && (
        <DateTimePicker
          display="spinner"
          mode="date"
          value={value ?? new Date()}
          minimumDate={new Date()}
          onChange={handleChange}
          positiveButton={{ label: "select", textColor: Colors.OrangePrimary }}
          negativeButton={{ label: "cancel", textColor: Colors.Grey }}
        />
      )}
    </View>
  );
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  title,
  fieldName,
  selected,
  items,
  width,
  onSelect,
}) => {
  const pickerRef = React.useRef<null | Picker<string>>(null);
  const renderItems = React.useCallback(
    () =>
      items.map((itemProps) => (
        <Picker.Item
          style={styles["picker-item"]}
          key={`picker-item-${itemProps.value}`}
          {...itemProps}
        />
      )),
    [items]
  );

  const buttonLabel = React.useCallback(() => {
    if (fieldName === "mainCategory" && selected) {
      return mainCategoryMapping[selected as keyof typeof mainCategoryMapping];
    } else {
      return selected || title;
    }
  }, [selected, fieldName]);

  const handleOpenPicker = React.useCallback(() => {
    pickerRef?.current?.focus();
  }, [pickerRef.current]);

  return (
    <View
      style={[
        { width: `${width ?? 100}%` },
        styles["input-button-container"],
        ...(selected ? [styles["input-button-container-active"]] : []),
      ]}
    >
      <TouchableOpacity
        style={styles["input-button"]}
        onPress={handleOpenPicker}
        disabled={!items.length}
      >
        <Text
          numberOfLines={1}
          style={[styles["picker-placeholder"], ...(selected ? [styles["picker-selected"]] : [])]}
        >
          {buttonLabel()}
        </Text>
        {!selected && <Icon name="down" height={15} width={15} />}
      </TouchableOpacity>
      <Picker
        ref={pickerRef}
        renderToHardwareTextureAndroid
        selectedValue={selected}
        onValueChange={(itemValue) => onSelect(itemValue, fieldName)}
        dropdownIconColor={Colors.Orange}
        dropdownIconRippleColor={Colors.OrangeBG}
        placeholder={title}
        enabled={!!items.length}
        style={styles["input-wrapper"]}
      >
        <Picker.Item
          style={styles["picker-placeholder"]}
          key={`picker-item-placeholder-${title}`}
          label={title}
          value={""}
          enabled={false}
        />
        {renderItems()}
      </Picker>
    </View>
  );
};

export default ItemFields;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.OrangeLight,
    borderColor: Colors.OrangeLight,
    borderWidth: 1,
    borderRadius: 10,
  },
  "inner-container": {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  "image-container": {
    position: "relative",
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
  },
  "number-container": {
    paddingHorizontal: 3,
  },
  "input-wrapper": {
    display: "none",
    opacity: 0,
    width: 0,
    height: 0,
  },
  "input-button-container": {
    justifyContent: "center",
    alignSelf: "stretch",
    height: ROW_HEIGHT,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "left",
    color: Colors.Orange,
    borderColor: Colors.Orange,
    backgroundColor: Colors.White,
  },
  "input-button-container-active": {
    backgroundColor: Colors.OrangeBG,
    borderWidth: 0,
  },
  "input-button": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  "picker-item": {
    width: "100%",
    fontFamily: "Quicksand_Medium",
    color: Colors.OrangePrimary,
    fontSize: 14,
  },
  "picker-placeholder": {
    fontFamily: "Quicksand_Medium",
    color: Colors.Orange,
    fontSize: 12,
  },
  "picker-selected": {
    color: Colors.OrangePrimary,
  },
  "input-group": {
    width: "59%",
    justifyContent: "space-between",
  },
  "input-inline": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "math-button": {
    minWidth: 21,
    fontSize: 14,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Orange,
    color: Colors.Orange,
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    position: "absolute",
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.35,
  },
  checkbox: {
    borderRadius: 7,
    width: 25,
    height: 25,
  },
  "checkbox-container": {
    transform: [{ translateX: -13 }, { translateY: -13 }],
    backgroundColor: Colors.White,
  },
  rotate: {
    transform: [{ rotate: "180deg" }],
  },
});
