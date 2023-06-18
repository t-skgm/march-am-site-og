import { ImageResponse } from 'next/server'
import { ServerRuntime } from 'next'
import { getValidToken } from '../../utils/encrypt'
import { getArticle } from '../../libs/contentful/getEntry'

export const runtime = 'edge' satisfies ServerRuntime

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get('id')
    const token = searchParams.get('i')
    const validToken = await getValidToken({ id })
    if (token !== validToken) {
      return new Response('Invalid', { status: 401 })
    }

    const article = await getArticle({ articleId: id! })

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center'
            }}
          >
            {article.fields.thumbnail?.fields.file?.url && (
              <img
                alt="Vercel"
                height={200}
                src={`https://${article.fields.thumbnail.fields.file.url.toString()}`}
                style={{ margin: '0 30px' }}
              />
            )}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap'
            }}
          >
            {article.fields.title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
