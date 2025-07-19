// import { createVAD } from '@ricky0123/vad';

// export async function* recordAndDetectVoice() {
//   const vad = await createVAD();
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   const audioCtx = new AudioContext();
//   const source = audioCtx.createMediaStreamSource(stream);
//   const processor = audioCtx.createScriptProcessor(4096, 1, 1);

//   source.connect(processor);
//   processor.connect(audioCtx.destination);

//   const queue = [];
//   let resolveNext;
//   let finished = false;

//   processor.onaudioprocess = async (event) => {
//     const input = event.inputBuffer.getChannelData(0);
//     const int16 = new Int16Array(input.length);
//     for (let i = 0; i < input.length; i++) {
//       int16[i] = input[i] * 32767;
//     }

//     const hasSpeech = await vad.processAudio(int16, 16000);
//     if (hasSpeech) {
//       queue.push({
//         frame: int16.buffer,
//         timestamp: Date.now()
//       });
//       if (resolveNext) {
//         resolveNext();
//         resolveNext = null;
//       }
//     }
//   };

//   try {
//     while (!finished) {
//       if (queue.length === 0) {
//         await new Promise(resolve => resolveNext = resolve);
//       }
//       while (queue.length > 0) {
//         yield queue.shift();
//       }
//     }
//   } finally {
//     finished = true;
//     processor.disconnect();
//     source.disconnect();
//     audioCtx.close();
//     stream.getTracks().forEach(track => track.stop());
//   }
// }
import { MicVAD } from '@ricky0123/vad-web';

export async function* recordAndDetectVoice() {
  const vad = await MicVAD.new({
    onSpeechEnd: (audio) => {
      console.log("onSpeechEnd triggered");
      queue.push(audio);
      if (resolver) {
        resolver();
        resolver = null;
      }
    },
    onSpeechStart: () => {
      console.log("onSpeechStart triggered");
    }
  });

  const queue = [];
  let resolver;

  await vad.start();

  try {
    while (true) {
      if (queue.length === 0) {
        await new Promise((resolve) => (resolver = resolve));
      }
      while (queue.length > 0) {
        yield queue.shift();
      }
    }
  } finally {
    vad.pause();
  }
}
