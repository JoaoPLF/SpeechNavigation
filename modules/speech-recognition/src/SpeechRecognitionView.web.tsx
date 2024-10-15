import * as React from 'react';

import { SpeechRecognitionViewProps } from './SpeechRecognition.types';

export default function SpeechRecognitionView(props: SpeechRecognitionViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
