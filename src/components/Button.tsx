import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonStyle from "../styles/Button";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import theme from "../theme";
import React from "react";
import ContainerStyle from "../styles/Containers";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonProps = {
  text: string;
  testID?: string;
  onPress: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

export default function Button({
  text,
  testID,
  onPress,
  loading,
  style,
  icon,
}: ButtonProps) {
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
      testID={testID}
      onPressIn={() => !loading && handlePressIn()}
      onPressOut={() => !loading && handlePressOut()}
      style={{ ...ButtonStyle.button, opacity, backgroundColor, ...style }}
      onPress={() => !loading && onPress()}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View style={ContainerStyle.row}>
          {icon && (
            <MaterialIcons
              name={icon}
              color={style?.color || theme.colors.textSecondary}
              size={20}
              style={{ marginRight: 5 }}
            />
          )}
          <Text style={ButtonStyle.text}>{text}</Text>
        </View>
      )}
    </AnimatedPressable>
  );
}
