import theme from "../theme";
import { TextProps as NativeTextProps } from "react-native";

export type ColorType = keyof typeof theme.colors;
export type FontSizeType = keyof typeof theme.fontSizes;
export type FontWeightType = keyof typeof theme.fontWeights;

export interface TextProps extends NativeTextProps {
  color?: ColorType;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  shadow?: boolean;
  style?: NativeTextProps["style"];
}
