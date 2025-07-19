🎙️ Solace Take Home – Task C

An end-to-end voice-driven web assistant using React. This app records user speech, detects when you're talking, transcribes the audio, sends it to a language model (Gemini or OpenAI), and plays back the AI’s response using AWS Polly.

=======================
📦 Features
=======================

- 🔊 Mic Recorder with Voice Activity Detection (VAD) using @ricky0123/vad-web
- ✍️ Transcription via AssemblyAI (or OpenAI Whisper alternative)
- 🧠 Gemini Pro (LLM) for chat
- 🔈 AWS Polly for speech output
- ⚡ SDK-style architecture (Task B reused as SDK)

=======================
🛠️ Setup Instructions
=======================

1. Clone the repo:
   git clone https://github.com/your-org/solace-task-c.git
   cd solace-task-c

2. Install dependencies:
   npm install

   If you encounter missing packages:
   npm install @ricky0123/vad-web @aws-sdk/client-polly
   npm install @google/generative-ai dotenv

3. Create `.env` file in root:

   REACT_APP_ASSEMBLYAI_API_KEY=your_assemblyai_key
   REACT_APP_GEMINI_API_KEY=your_gemini_key
   REACT_APP_POLLY_REGION=us-east-1
   REACT_APP_POLLY_ACCESS_KEY_ID=your_aws_access_key
   REACT_APP_POLLY_SECRET_ACCESS_KEY=your_aws_secret_key

4. Run the app:
   npm start

   Then open http://localhost:3000 in your browser.

=======================
🧩 Project Structure
=======================

src/
├── App.js                # Main app with flow control
├── components/
│   ├── MicRecorder.js    # VAD + mic interface
│   ├── ChatEngine.js     # Handles audio upload, Gemini call
│   └── TTSPlayer.js      # Polly text-to-speech playback
├── utils/
│   └── float32ToWav.js   # Converts Float32Array → WAV blob
├── sdk/ (from Task B)    # Your SDK utils (encryptBlob, etc.)

=======================
🚀 Task C Workflow
=======================

1. User clicks “Talk”
2. VAD listens to the mic input
3. On speech end:
   - Audio is converted to WAV
   - Uploaded to AssemblyAI for transcription
   - Transcribed text is sent to Gemini
   - Response is spoken back using AWS Polly

=======================
🔄 Switch LLM Provider
=======================

To use OpenAI instead of Gemini:

1. Install OpenAI:
   npm install openai

2. In ChatEngine.js:
   Replace Gemini code with:
   openai.createChatCompletion({ ... })

=======================
✅ Known Issues
=======================

- AssemblyAI needs WAV (16kHz, mono)
- VAD will not trigger on very short speech
- Polly requires correct region + keys
- Gemini API needs valid key from Google AI Console

=======================
🧪 Test Tips
=======================

- Use Chrome (Web Audio API compatible)
- Look for console logs like “Got speech frame”
- If you see `422 Unprocessable Content` from AssemblyAI:
  ensure WAV encoding is valid

=======================
📄 License
=======================

This code is part of Solace’s take-home engineering challenge. Use is restricted to interview evaluation purposes.