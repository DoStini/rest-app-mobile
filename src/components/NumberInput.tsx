import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ContainerStyle from "../styles/Containers";
import Text from "./Text";
import theme from "../theme";
import { useCallback, useMemo, useState } from "react";
import _debounce from "lodash/debounce";

type NumberInputProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: (() => void) | null;
  onFinished: (amount: number) => void;
  onStarted: () => void;
};

const NumberInput = ({
  value,
  setValue,
  handleDelete,
  onFinished,
  onStarted,
}: NumberInputProps) => {
  const debounceFn = useCallback(_debounce(onFinished, 500), []);

  const deletable = handleDelete != null;

  const handleIncrement = () => {
    setValue((old: number) => old + 1);
    onStarted();
    debounceFn(value + 1);
  };

  const handleDecrement = useCallback(() => {
    if (value === 1 && deletable) {
      handleDelete();
      return;
    }

    onStarted();
    setValue((old: number) => old - 1);
    debounceFn(value - 1);
  }, [value]);

  return (
    <View style={ContainerStyle.rowSpaceBetween}>
      <Pressable
        style={{ paddingHorizontal: 5 }}
        disabled={value === 0}
        onPress={handleDecrement}
      >
        {value === 1 && deletable ? (
          <MaterialIcons color={theme.colors.error} name="delete" size={26} />
        ) : (
          <MaterialIcons
            color={value > 0 ? theme.colors.textSecondary : "transparent"}
            name="remove-circle-outline"
            size={26}
          />
        )}
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
export default NumberInput;
