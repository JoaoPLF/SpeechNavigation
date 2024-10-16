import { addEndOfSpeechListener, addReadyForSpeechListener, startSpeechRecognition, stopSpeechRecognition } from "@/modules/speech-recognition";
import { FontAwesome } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, ToastAndroid, View } from "react-native";

export const MicButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const readyForSpeechSubscription = addReadyForSpeechListener(() => {
      setIsRecording(true);
    });

    const endOfSpeechSubscription = addEndOfSpeechListener(() => {
      setIsRecording(false);
    });

    return () => {
      readyForSpeechSubscription.remove();
      endOfSpeechSubscription.remove();
    };
  }, []);

  const startRecording = async () => {
    try {
      if (!!permissionResponse?.canAskAgain) {
        await requestPermission();
      }

      if (permissionResponse?.status === 'denied') {
        ToastAndroid.show('Enable microphone permissions in settings', ToastAndroid.LONG);
        await Linking.openSettings();
        return;
      }

      await startSpeechRecognition();
    }
    catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      await stopSpeechRecognition();
      setIsRecording(false);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.button}>
      <FontAwesome.Button name={isRecording ? "stop" : "microphone"} iconStyle={{ marginRight: 0 }} onPress={() => isRecording ? stopRecording() : startRecording()} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: 16,
    right: 16,
    position: "absolute",
  }
});