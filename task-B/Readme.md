@solace/client-sdk
A cross-platform JavaScript SDK for secure blob encryption, voice activity detection (VAD), and seamless integration with Solace services.

Features:

AES-GCM Encryption with Web Crypto API

Voice Activity Detection using WebAssembly

Blob Upload & Download via HTTP endpoints (Task A compatible)

Works in modern browsers (ES Modules)

Folder Structure:
task-B/
├── src/
│ ├── crypto.js - encryptBlob / decryptBlob
│ ├── vad.js - recordAndDetectVoice
│ ├── network.js - uploadBlob / downloadAndDecrypt
│ └── index.js - SDK entry point
├── demo/ - Sample React demo
├── tests/ - Jest unit tests
├── package.json
└── README.md

Installation:

Local (Recommended for Task C):
From task-B/ directory:

npm link

Then in your consuming project (e.g., task-C/):

npm link solace-client-sdk

npm (if published):

npm install @solace/client-sdk

API Reference:

encryptBlob(data: string) => Promise<{ iv, ciphertext, key }>
Encrypts a string using AES-GCM 256.

decryptBlob({ iv, ciphertext, key }) => Promise<string>
Decrypts the blob back into a string using AES-GCM.

recordAndDetectVoice() => AsyncIterable<{ frame, timestamp }>
Yields only frames where speech is detected (uses VAD).

uploadBlob(blob: object, apiUrl: string, token: string) => Promise<string>
Uploads encrypted blob to the Task A endpoint. Returns a blobKey.

downloadAndDecrypt(blobKey: string, apiUrl: string, key) => Promise<string>
Downloads the blob from Task A and decrypts it using the given key.

Testing:

To run unit tests:

npm install
npm test

Tests are located in:
tests/crypto.test.js

Demo (Optional):

You can run the example React demo in /demo/:

cd demo
npm install
npm start

The demo includes:

Record with VAD

Encrypt & upload

Download & decrypt