import React, { useRef } from 'react';
import { recordAndDetectVoice } from 'solace-client-sdk';

export default function MicRecorder({ onAudioFrame }) {
  const recordingRef = useRef(false);

  const start = async () => {
    console.log("Mic start clicked");
    recordingRef.current = true;
    try {
      for await (const frame of recordAndDetectVoice()) {
        if (!recordingRef.current) break;
        console.log("Got speech frame");
        onAudioFrame(frame);
      }
    } catch (err) {
      console.error("VAD error", err);
    }
  };

  const stop = () => {
    console.log("Mic stop clicked");
    recordingRef.current = false;
  };

  return (
    <div>
      <button onClick={start}>🎙️ Talk</button>
      <button onClick={stop}>⛔ Stop</button>
    </div>
  );
}
