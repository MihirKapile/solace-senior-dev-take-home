import React, { useState } from 'react';
import MicRecorder from './components/MicRecorder';
import { transcribeAudio, getChatResponse } from './components/ChatEngine';
import { speak } from './components/TTSPlayer';

function App() {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [chunks, setChunks] = useState([]);

  const handleAudioFrame = ({ frame }) => {
    setChunks(prev => [...prev, new Int16Array(frame)]);
  };

  const stopAndSend = async () => {
    const blob = new Blob(chunks, { type: 'audio/wav' });
    const text = await transcribeAudio(blob);
    setTranscript(text);
    const reply = await getChatResponse(text);
    setResponse(reply);
    await speak(reply);
    setChunks([]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Solace Voice Companion</h1>
      <MicRecorder onAudioFrame={handleAudioFrame} />
      <button onClick={stopAndSend}>Send & Get Reply</button>
      <p><strong>You said:</strong> {transcript}</p>
      <p><strong>AI replied:</strong> {response}</p>
    </div>
  );
}

export default App;