import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SpeechRecognition.web.ts
// and on native platforms to SpeechRecognition.ts
import SpeechRecognitionModule from './src/SpeechRecognitionModule';
import { SpeechResultEventPayload } from './src/SpeechRecognition.types';

export async function startSpeechRecognition() {
  return await SpeechRecognitionModule.startSpeechRecognition();
}

const emitter = new EventEmitter(SpeechRecognitionModule ?? NativeModulesProxy.SpeechRecognition);

export function addSpeechResultListener(listener: (event: SpeechResultEventPayload) => void): Subscription {
  return emitter.addListener<SpeechResultEventPayload>('onSpeechResult', listener);
}

export { SpeechResultEventPayload };
