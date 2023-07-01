// https://github.com/vercel/satori/issues/511#issuecomment-1605191371
// https://github.com/vercel/satori/blob/83d658542719c5cf0ea2354e782489f9e1e60a84/playground/pages/api/font.ts

/** Function sizeに加算されないように毎回FontをFetchする */
export async function fetchGoogleFont(
  font: string,
  textToIncludeSubset: string
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    textToIncludeSubset
  )}`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.1+ (KHTML, like Gecko) Version/10.0.0.1337 Mobile Safari/537.1+'
      }
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) throw Error('No font data')

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}
