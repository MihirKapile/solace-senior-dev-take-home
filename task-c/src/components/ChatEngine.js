import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export async function transcribeAudio(blob) {
  const apiKey = process.env.REACT_APP_ASSEMBLYAI_API_KEY;

  const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: {
      authorization: apiKey,
    },
    body: blob,
  });

  const uploadData = await uploadResponse.json();
  const audioUrl = uploadData.upload_url;

  const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      authorization: apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ audio_url: audioUrl }),
  });

  const transcriptData = await transcriptResponse.json();
  const transcriptId = transcriptData.id;

  let status = transcriptData.status;
  let transcriptText = '';

  while (status !== 'completed' && status !== 'error') {
    await new Promise(res => setTimeout(res, 3000));
    const pollingResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: {
        authorization: apiKey,
      },
    });
    const pollingData = await pollingResponse.json();
    status = pollingData.status;
    if (status === 'completed') {
      transcriptText = pollingData.text;
    } else if (status === 'error') {
      throw new Error('Transcription failed: ' + pollingData.error);
    }
  }

  return transcriptText;
}

export async function getChatResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}