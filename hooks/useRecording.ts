import { speechNavigate } from "@/libs/speechNavigation";
import { addEndOfSpeechListener, addReadyForSpeechListener, addSpeechResultListener, startSpeechRecognition, stopSpeechRecognition } from "@/modules/speech-recognition";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Linking, ToastAndroid } from "react-native";

const DEFAULT_BUTTON_TEXT = "Say something...";

export const useRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    const readyForSpeechSubscription = addReadyForSpeechListener(() => {
      setIsRecording(true);
      setButtonText(DEFAULT_BUTTON_TEXT);
    });

    let timeout: NodeJS.Timeout | null = null;
    const endOfSpeechSubscription = addEndOfSpeechListener(() => {
      timeout = setTimeout(() => {
        setIsRecording(false);
      }, 750);
    });

    const speechResultSubscription = addSpeechResultListener((event) => {
      setButtonText(event.value);
      speechNavigate(event.value);
    });

    return () => {
      readyForSpeechSubscription.remove();
      endOfSpeechSubscription.remove();
      !!timeout && clearTimeout(timeout);
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

  return { isRecording, buttonText, toggleRecording };
};
