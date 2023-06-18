import { createClient } from 'contentful'

export const createContentfulClient = () =>
  createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    host: 'cdn.contentful.com'
  })

/** プレビュー表示用 */
export const createContentfulPreviewClient = () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
    host: 'preview.contentful.com'
  })

  return client
}
