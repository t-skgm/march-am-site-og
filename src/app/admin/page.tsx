import { getToken } from '../../utils/getTokenNode'
import { getArticle } from '../../libs/contentful/getEntry'

type AdminPageProps = {
  searchParams: Promise<{ id?: string | string[] }>
}

async function getKeyToken(params: Record<string, unknown>) {
  return getToken(params)
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true

export default async function Page({ searchParams }: AdminPageProps) {
  const resolvedSearchParams = await searchParams
  const { id } = resolvedSearchParams

  if (typeof id !== 'string' || id.length === 0) {
    return (
      <div>
        <h1>Encrypted Open Graph Image.</h1>
        <p>Contentful article IDをクエリパラメータ `id` に指定してください。</p>
      </div>
    )
  }

  const article = await getArticle({ articleId: id })

  const text = `${article.fields.title}`

  const token = await getKeyToken({ text })

  const href = `/og?i=${token}&text=${encodeURIComponent(text)}`

  return (
    <div>
      <h1>Encrypted Open Graph Image.</h1>
      <p>params: {JSON.stringify(resolvedSearchParams)}</p>
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
