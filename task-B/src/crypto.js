export async function encryptBlob(data) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = enc.encode(data);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);

  return {
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(encrypted)),
    key: Array.from(new Uint8Array(exportedKey)),
  };
}

export async function decryptBlob({ iv, ciphertext, key }) {
  const keyBuffer = new Uint8Array(key);
  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    importedKey,
    new Uint8Array(ciphertext)
  );

  return new TextDecoder().decode(decrypted);
}