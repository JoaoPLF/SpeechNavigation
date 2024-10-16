import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useMicAnimation } from "@/hooks/useMicAnimation";
import { useRecording } from "@/hooks/useRecording";

export const MicButton = () => {
  const { isRecording, buttonText, toggleRecording } = useRecording();
  const { animatedStyle, onLayout } = useMicAnimation(isRecording);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FontAwesome.Button
        name={isRecording ? "stop" : "microphone"}
        style={{ ...styles.button, justifyContent: isRecording ? "flex-start" : "center", gap: 8 }}
        iconStyle={{ marginRight: 0 }}
        onLayout={onLayout}
        onPress={toggleRecording}
      >
        {isRecording ? buttonText : null}
      </FontAwesome.Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 60,
    right: 16,
    position: "absolute"
  },
  button: {
    height: 48,
    maxHeight: 48,
  }
});