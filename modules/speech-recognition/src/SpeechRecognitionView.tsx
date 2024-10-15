import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SpeechRecognitionViewProps } from './SpeechRecognition.types';

const NativeView: React.ComponentType<SpeechRecognitionViewProps> =
  requireNativeViewManager('SpeechRecognition');

export default function SpeechRecognitionView(props: SpeechRecognitionViewProps) {
  return <NativeView {...props} />;
}
