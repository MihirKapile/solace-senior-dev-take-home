import React, { useState } from 'react';
import { encryptBlob, decryptBlob } from '../src/crypto';
import { uploadBlob, downloadAndDecrypt } from '../src/network';

function App() {
  const [plaintext, setPlaintext] = useState('');
  const [result, setResult] = useState('');

  async function handleEncryptUpload() {
    const blob = await encryptBlob(plaintext);
    const blobKey = await uploadBlob(blob, '<API_URL>', '<TOKEN>');
    setResult(`Uploaded with key: ${blobKey}`);
  }

  async function handleDownloadDecrypt() {
    const decrypted = await downloadAndDecrypt('<BLOB_KEY>', '<API_URL>', '<KEY>');
    setResult(decrypted);
  }

  return (
    <div>
      <h1>Solace Demo</h1>
      <textarea onChange={e => setPlaintext(e.target.value)} />
      <br />
      <button onClick={handleEncryptUpload}>Encrypt & Upload</button>
      <button onClick={handleDownloadDecrypt}>Fetch & Decrypt</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default App;