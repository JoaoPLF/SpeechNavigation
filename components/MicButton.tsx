import { startSpeechRecognition } from "@/modules/speech-recognition";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { StyleSheet, View } from "react-native";

export const MicButton = () => {
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }

      await startSpeechRecognition();
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.button}>
      <FontAwesome.Button name="microphone" iconStyle={{ marginRight: 0 }} onPress={startRecording} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  b: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});