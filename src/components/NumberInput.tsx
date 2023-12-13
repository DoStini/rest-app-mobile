import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ContainerStyle from "../styles/Containers";
import Text from "./Text";
import theme from "../theme";

type NumberInputProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const NumberInput = ({ value, setValue }: NumberInputProps) => {
  const handleIncrement = () => {
    setValue((old: number) => old + 1);
  };

  const handleDecrement = () => {
    setValue((old: number) => old - 1);
  };

  return (
    <View style={ContainerStyle.rowSpaceBetween}>
      <Pressable style={{ paddingHorizontal: 5 }} onPress={handleDecrement}>
        <MaterialIcons
          color={theme.colors.textSecondary}
          name="remove-circle-outline"
          size={26}
          onPress={handleDecrement}
        />
      </Pressable>
      <Text
        fontSize="small"
        style={{ textAlignVertical: "center", marginHorizontal: 5 }}
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
