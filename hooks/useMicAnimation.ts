import { useEffect, useMemo, useRef } from "react";
import { Dimensions, LayoutChangeEvent } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const MARGIN = 32;

export const useMicAnimation = (isRecording: boolean) => {
  const isMounted = useRef(false);
  const initialWidth = useRef(0);
  const screenWidth = useMemo(() => Dimensions.get("screen").width - MARGIN, []);

  const sharedWidth = useSharedValue(initialWidth.current);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: sharedWidth.value === 0 ? "auto" : sharedWidth.value,
    };
  });

  const onLayout = (event: LayoutChangeEvent) => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (initialWidth.current === 0) {
      initialWidth.current = event.nativeEvent.layout.width;
    }
  };

  useEffect(() => {
    sharedWidth.value = withTiming(isRecording ? screenWidth : initialWidth.current, { duration: 300 });
  }, [isRecording]);

  return {
    animatedStyle,
    onLayout
  };
};
