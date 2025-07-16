import { encryptBlob, decryptBlob } from '../src/crypto';

test('encrypt and decrypt should return original text', async () => {
  const text = "Hello Solace!";
  const { iv, ciphertext, key } = await encryptBlob(text);
  const result = await decryptBlob({ iv, ciphertext, key });
  expect(result).toBe(text);
});
