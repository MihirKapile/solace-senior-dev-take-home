export async function uploadBlob(blob, apiUrl, token) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ blob })
  });
  const result = await response.json();
  return result.blobKey;
}

export async function downloadAndDecrypt(blobKey, apiUrl, key) {
  const res = await fetch(`${apiUrl}?blobKey=${blobKey}`);
  const { iv, ciphertext } = await res.json();
  return await decryptBlob({ iv, ciphertext, key });
}