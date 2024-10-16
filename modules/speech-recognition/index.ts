import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import SpeechRecognitionModule from './src/SpeechRecognitionModule';
import { SpeechResultEventPayload } from './src/SpeechRecognition.types';

export async function startSpeechRecognition() {
  return await SpeechRecognitionModule.startSpeechRecognition();
}

export async function stopSpeechRecognition() {
  return await SpeechRecognitionModule.stopSpeechRecognition();
}

const emitter = new EventEmitter(SpeechRecognitionModule ?? NativeModulesProxy.SpeechRecognition);

export function addReadyForSpeechListener(listener: () => void): Subscription {
  return emitter.addListener('onReadyForSpeech', listener);
}

export function addEndOfSpeechListener(listener: () => void): Subscription {
  return emitter.addListener('onEndOfSpeech', listener);
}

export function addSpeechResultListener(listener: (event: SpeechResultEventPayload) => void): Subscription {
  return emitter.addListener<SpeechResultEventPayload>('onSpeechResult', listener);
}

export { SpeechResultEventPayload };
