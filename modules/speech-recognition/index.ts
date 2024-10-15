import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SpeechRecognition.web.ts
// and on native platforms to SpeechRecognition.ts
import SpeechRecognitionModule from './src/SpeechRecognitionModule';
import SpeechRecognitionView from './src/SpeechRecognitionView';
import { ChangeEventPayload, OKEventPayload, SpeechRecognitionViewProps } from './src/SpeechRecognition.types';

export async function startSpeechRecognition() {
  return await SpeechRecognitionModule.startSpeechRecognition();
}

const emitter = new EventEmitter(SpeechRecognitionModule ?? NativeModulesProxy.SpeechRecognition);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export function addOKListener(listener: (event: OKEventPayload) => void): Subscription {
  return emitter.addListener<OKEventPayload>('OK', listener);
}

export { SpeechRecognitionView, SpeechRecognitionViewProps, ChangeEventPayload };
