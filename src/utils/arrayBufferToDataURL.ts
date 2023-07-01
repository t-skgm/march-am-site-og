export function arrayBufferToDataURL(buffer: ArrayBuffer, memeType: string = 'image/jpeg') {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return `data:${memeType};base64,${btoa(binary)}`
}
