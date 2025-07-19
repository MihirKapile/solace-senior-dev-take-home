import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';

const client = new PollyClient({
  region: process.env.REACT_APP_POLLY_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_POLLY_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_POLLY_SECRET_ACCESS_KEY,
  },
});

export async function speak(text, voice = 'Joanna') {
  const command = new SynthesizeSpeechCommand({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: voice,
  });
  const { AudioStream } = await client.send(command);
  const audioBlob = new Blob([AudioStream], { type: 'audio/mpeg' });
  const audio = new Audio(URL.createObjectURL(audioBlob));
  audio.play();
}