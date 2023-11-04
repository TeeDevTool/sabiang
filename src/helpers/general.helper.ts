import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
export const SECTION_GAP = height * 0.026;

export function randomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateKey(): number {
  return randomNumberInRange(1, 999);
}

const MAXIMUM_CARDS_PER_ROW = 2;

export function createPairDatas<T>(data: T[]) {
  const totalRow = Math.ceil(data.length / MAXIMUM_CARDS_PER_ROW);
  return [...Array(totalRow)].map((_, rowIndex) =>
    [...Array(MAXIMUM_CARDS_PER_ROW)].map((_, itemIndex) => {
      const dataIndex = rowIndex * MAXIMUM_CARDS_PER_ROW + itemIndex;
      return data[dataIndex];
    })
  );
}

export const defaultItemData: ItemDetailsInterface = {
  id: "",
  selected: false,
  mainCategory: "",
  subCategory: "",
  tag: "",
  exp: null,
  amount: 0,
  image: "",
};

export interface ItemDetailsInterface {
  id: string;
  selected: boolean;
  mainCategory: string;
  subCategory: string;
  tag: string;
  exp: Date | null;
  amount: number;
  image: string;
}
