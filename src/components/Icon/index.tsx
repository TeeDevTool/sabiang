import React from "react";
import { Image, ImageStyle } from "react-native";

const DEFAULT_SIZE = 32;

type IconsType =
  | "close"
  | "correct"
  | "correct-active"
  | "delete"
  | "eat"
  | "smile"
  | "add"
  | "home"
  | "home-active"
  | "date"
  | "date-active"
  | "manage"
  | "manage-active"
  | "urgent"
  | "urgent-active"
  | "more"
  | "down"
  | "left"
  | "right"
  | "ditch"
  | "refresh"
  | "back";

interface IconProps {
  name: IconsType;
  propsStyles?: ImageStyle[];
  width?: number;
  height?: number;
}

// only support png image
const Icon: React.FC<IconProps> = ({
  name,
  propsStyles = [],
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}) => {
  switch (name) {
    case "close":
      return (
        <Image
          source={require("../../../assets/images/icons/close.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "delete":
      return (
        <Image
          source={require("../../../assets/images/icons/delete.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "eat":
      return (
        <Image
          source={require("../../../assets/images/icons/eat.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "add":
      return (
        <Image
          source={require("../../../assets/images/icons/add.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "home":
      return (
        <Image
          source={require("../../../assets/images/icons/home.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "home-active":
      return (
        <Image
          source={require("../../../assets/images/icons/home-active.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "date":
      return (
        <Image
          source={require("../../../assets/images/icons/date.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "date-active":
      return (
        <Image
          source={require("../../../assets/images/icons/date-active.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "urgent":
      return (
        <Image
          source={require("../../../assets/images/icons/urgent.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "urgent-active":
      return (
        <Image
          source={require("../../../assets/images/icons/urgent-active.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "manage":
      return (
        <Image
          source={require("../../../assets/images/icons/manage.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "manage-active":
      return (
        <Image
          source={require("../../../assets/images/icons/manage-active.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "more":
      return (
        <Image
          source={require("../../../assets/images/icons/more.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "left":
      return (
        <Image
          source={require("../../../assets/images/icons/left.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "right":
      return (
        <Image
          source={require("../../../assets/images/icons/right.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "down":
      return (
        <Image
          source={require("../../../assets/images/icons/down.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "back":
      return (
        <Image
          source={require("../../../assets/images/icons/back.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "correct":
      return (
        <Image
          source={require("../../../assets/images/icons/correct.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "correct-active":
      return (
        <Image
          source={require("../../../assets/images/icons/correct-active.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "ditch":
      return (
        <Image
          source={require("../../../assets/images/icons/not-eat.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "refresh":
      return (
        <Image
          source={require("../../../assets/images/icons/refresh.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
    case "smile":
    default:
      return (
        <Image
          source={require("../../../assets/images/icons/smile.png")}
          fadeDuration={0}
          style={[{ width, height }, ...propsStyles]}
        />
      );
  }
};

export default Icon;
