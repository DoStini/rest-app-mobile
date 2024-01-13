import { Dimensions, StyleProp, View, ViewStyle } from "react-native";
import theme from "../theme";
import styled from "styled-components";

export type DividerProps = {
  style?: StyleProp<ViewStyle>;
  marginVertical?: number;
  marginHorizontal?: number;
  borderWidth?: number;
  borderWidthExtra?: number;
};

const Divider = ({
  style,
  borderWidth,
  borderWidthExtra,
  marginHorizontal,
  marginVertical,
}: DividerProps) => {
  return (
    <View
      style={[
        {
          borderTopColor: theme.colors.borderColor,
          borderTopWidth: borderWidthExtra || 0,
          borderBottomWidth: borderWidth || 2,
          borderBottomColor: theme.colors.borderColor,
          marginHorizontal: marginHorizontal != null ? marginHorizontal : -20,
          marginVertical: marginVertical != null ? marginVertical : 10,
        },
        style,
      ]}
    />
  );
};

export default Divider;
