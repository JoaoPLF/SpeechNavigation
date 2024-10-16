import { speechNavigate } from "@/libs/speechNavigation";
import { addEndOfSpeechListener, addReadyForSpeechListener, addSpeechResultListener, startSpeechRecognition, stopSpeechRecognition } from "@/modules/speech-recognition";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Linking, ToastAndroid } from "react-native";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const readyForSpeechSubscription = addReadyForSpeechListener(() => {
      setIsRecording(true);
    });

    const endOfSpeechSubscription = addEndOfSpeechListener(() => {
      setIsRecording(false);
    });

    const speechResultSubscription = addSpeechResultListener((event) => {
      ToastAndroid.show(event.value, ToastAndroid.SHORT);
      speechNavigate(event.value);
    });

    return () => {
      readyForSpeechSubscription.remove();
      endOfSpeechSubscription.remove();
      speechResultSubscription.remove();
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

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  return { isRecording, toggleRecording };
};
