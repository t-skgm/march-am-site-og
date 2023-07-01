import { PageProps } from '../../types'
import { getToken } from '../../utils/getTokenNode'
import { getArticle } from '../../libs/contentful/getEntry'

async function getKeyToken(params: Record<string, unknown>) {
  return getToken(params)
}

export const dynamicParams = true

export default async function Page({ searchParams }: PageProps<{}, { id: string }>) {
  const id = searchParams.id
  const article = await getArticle({ articleId: id! })

  const title = article.fields.title

  const token = await getKeyToken({ title })

  const href = `/og-article?i=${token}&title=${encodeURIComponent(title)}`

  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>params: {JSON.stringify(searchParams)}</p>
      <h2>Article</h2>
      <ul>
        <li>
          <a href={href} target="_blank" rel="noreferrer">
            <code>{href}</code>
          </a>
        </li>
      </ul>
    </div>
  )
}
