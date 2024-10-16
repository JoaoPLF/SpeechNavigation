import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type SpeechTextProps = {
  active: boolean;
};

export const SpeechText = ({ active }: SpeechTextProps) => {
  const width = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  useEffect(() => {
    width.value = withTiming(active ? 150 : 0, { duration: 300 });
  }, [active]);

  return <Animated.Text style={[styles.text, animatedStyle]} />;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});