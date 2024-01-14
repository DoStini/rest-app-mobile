import React from "react";
import { View } from "react-native";
import ContainerStyle from "../styles/Containers";
import Text from "./Text";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderProps = {
  goBack?: () => void;
  title: string;
  rightButton?: React.ReactNode;
  afterTitle?: React.ReactNode;
};

export default function Header({
  goBack,
  title,
  afterTitle,
  rightButton,
}: HeaderProps) {
  return (
    <View
      style={[
        ContainerStyle.rowSpaceBetween,
        { alignItems: "center", marginBottom: 20 },
      ]}
    >
      {goBack && (
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={goBack}
        />
      )}
      <View style={[ContainerStyle.row, { alignItems: "center" }]}>
        <Text fontSize="heading" fontWeight="medium">
          {title}
        </Text>
        {afterTitle}
      </View>
      {rightButton}
    </View>
  );
}
