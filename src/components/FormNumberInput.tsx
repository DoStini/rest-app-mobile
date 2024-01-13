import { Pressable, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ContainerStyle from "../styles/Containers";
import Text from "./Text";
import theme from "../theme";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

type NumberInputProps = {
  value: number;
  setValue: (e: number) => void;
  min: number;
  max: number;
};

const FormNumberInput = ({ value, setValue, min, max }: NumberInputProps) => {
  const handleIncrement = () => {
    if (value === max) {
      return;
    }
    setValue(value + 1);
  };

  const handleDecrement = useCallback(() => {
    if (value === min) {
      return;
    }
    setValue(value - 1);
  }, [value]);

  return (
    <View style={ContainerStyle.rowSpaceBetween}>
      <Pressable
        style={{ paddingHorizontal: 5 }}
        disabled={value === min}
        onPress={handleDecrement}
      >
        <MaterialIcons
          color={theme.colors.textSecondary}
          name="remove-circle-outline"
          size={26}
        />
      </Pressable>
      <Text
        fontSize="small"
        style={{
          textAlignVertical: "center",
          textAlign: "right",
          marginHorizontal: 5,
          width: 20,
        }}
        color="textSecondary"
      >
        {value}
      </Text>
      <Pressable style={{ paddingHorizontal: 5 }} onPress={handleIncrement}>
        <MaterialIcons
          color={theme.colors.textSecondary}
          name="add-circle-outline"
          size={26}
        />
      </Pressable>
    </View>
  );
};
export default FormNumberInput;
