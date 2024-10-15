import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to SpeechRecognition.web.ts
// and on native platforms to SpeechRecognition.ts
import SpeechRecognitionModule from './src/SpeechRecognitionModule';
import SpeechRecognitionView from './src/SpeechRecognitionView';
import { ChangeEventPayload, SpeechRecognitionViewProps } from './src/SpeechRecognition.types';

// Get the native constant value.
export const PI = SpeechRecognitionModule.PI;

export function hello(): string {
  return SpeechRecognitionModule.hello();
}

export async function setValueAsync(value: string) {
  return await SpeechRecognitionModule.setValueAsync(value);
}

const emitter = new EventEmitter(SpeechRecognitionModule ?? NativeModulesProxy.SpeechRecognition);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { SpeechRecognitionView, SpeechRecognitionViewProps, ChangeEventPayload };
