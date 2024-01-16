import React from "react";
import { Pressable, View } from "react-native";
import ContainerStyle from "../../styles/Containers";
import Text from "../Text";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../Button";
import AuthHeader from "./AuthHeader";

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
    <React.Fragment>
      <AuthHeader />
      <View style={[ContainerStyle.rowSpaceBetween, { alignItems: "center" }]}>
        {goBack && (
          <MaterialIcons
            name="arrow-back"
            testID="goBackButton"
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
    </React.Fragment>
  );
}
