import { Pressable, Text } from "react-native";
import ButtonStyle from "../styles/Button";

export type ButtonProps = {
  text: string;
  onPress: () => void;
};

export default function Button({ text, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={ButtonStyle.button}>
      <Text style={ButtonStyle.text}>{text}</Text>
    </Pressable>
  );
}
