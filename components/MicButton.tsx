import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useMicAnimation } from "@/hooks/useMicAnimation";
import { useRecording } from "@/hooks/useRecording";

export const MicButton = () => {
  const { isRecording, toggleRecording } = useRecording();
  const { animatedStyle, onLayout } = useMicAnimation(isRecording);

  return (
    <Animated.View style={[styles.button, animatedStyle]}>
      <FontAwesome.Button name={isRecording ? "stop" : "microphone"} iconStyle={{ marginRight: 0 }} onPress={toggleRecording} onLayout={onLayout} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 16,
    right: 16,
    position: "absolute"
  }
});