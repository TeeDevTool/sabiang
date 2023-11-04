import React from "react";
import { Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootRouteParamList } from "../../../App";
import MinimalLayout from "../../layouts/Minimal";
import { Calendar } from "react-native-calendars";
import Icon from "../../components/Icon";
import { Colors } from "../../common/palette";
import Button from "../../components/Button";
import { randomNumberInRange } from "../../helpers/general.helper";

const { width, height } = Dimensions.get("window");
const CELL_WIDTH = ((width - 30) / 7) * 0.9;
const CELL_HEIGHT = (height - 300) / 6;

interface CalendarDayComponentProps {
  today: number;
  item: number;
  dayProps: any;
}

const CalendarDayComponent: React.FC<CalendarDayComponentProps> = ({ today, dayProps, item }) => {
  return (
    <TouchableOpacity
      style={[
        styles["day-container"],
        {
          backgroundColor: today == dayProps.date?.day ? Colors.White : Colors.OrangeCalendar,
          borderWidth: today == dayProps.date?.day ? 1.5 : 0,
        },
      ]}
    >
      <Text
        style={[
          styles["day-date"],
          {
            color: today == dayProps.date?.day ? Colors.OrangePrimary : Colors.Grey,
          },
        ]}
      >
        {dayProps.date?.day}
      </Text>
      {!!item && (
        <>
          <Text style={styles["day-item"]}>{`${item} item${item > 1 ? "s" : ""}`}</Text>
          <Button
            title="See"
            onPress={() => {}}
            fontLevel={0.5}
            paddingX={-1}
            paddingY={2}
            isGradient
            bold
          />
        </>
      )}
    </TouchableOpacity>
  );
};

const EXPDates: React.FC<BottomTabScreenProps<RootRouteParamList, "date">> = () => {
  const today = new Date().getDate();
  return (
    <MinimalLayout header="Expiry dates">
      <Calendar
        dayComponent={(dayProps) => {
          const item = randomNumberInRange(0, 2);
          return <CalendarDayComponent today={today} item={item} dayProps={dayProps} />;
        }}
        theme={{
          textDayHeaderFontFamily: "Quicksand_Medium",
          textMonthFontFamily: "Quicksand_Medium",
          textMonthFontSize: 22,
          todayTextColor: Colors.OrangePrimary,
        }}
        maxDate={undefined} // For directly select month and year in version 2
        minDate={undefined} // For directly select month and year in version 2
        renderArrow={(direction) => <Icon name={direction} height={20} width={20} />}
        hideExtraDays
      />
    </MinimalLayout>
  );
};

const styles = StyleSheet.create({
  "day-container": {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor: Colors.OrangePrimary,
    borderRadius: 4,
    padding: 5,
  },
  "day-date": {
    fontFamily: "Quicksand_Bold",
    fontSize: 15,
    lineHeight: 16,
  },
  "day-item": {
    color: Colors.Grey,
    fontFamily: "Quicksand_Regular",
    fontSize: 8,
  },
});

export default EXPDates;
