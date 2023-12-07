import { ActivityIndicator, Pressable, Text } from "react-native";
import ButtonStyle from "../styles/Button";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import theme from "../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonProps = {
  text: string;
  onPress: () => void;
  loading?: boolean;
};

export default function Button({ text, onPress, loading }: ButtonProps) {
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    opacity.value = withSpring(0.8);
  };

  const handlePressOut = () => {
    opacity.value = withSpring(1);
  };

  const backgroundColor = loading
    ? theme.colors.selectedColor
    : theme.colors.tertiary;

  return (
    <AnimatedPressable
      onPressIn={() => !loading && handlePressIn()}
      onPressOut={() => !loading && handlePressOut()}
      style={{ ...ButtonStyle.button, opacity, backgroundColor }}
      onPress={() => !loading && onPress()}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={ButtonStyle.text}>{text}</Text>
      )}
    </AnimatedPressable>
  );
}