import { ImageResponse } from 'next/server'
import { ServerRuntime } from 'next'
import { getValidToken } from '../../utils/encrypt'
import { constants } from '../../constants'
import { fetchGoogleFont } from '../../utils/fetchGoogleFont'

export const runtime: ServerRuntime = 'edge'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const text = searchParams.get('text') ?? ''

    const token = searchParams.get('i')
    const validToken = await getValidToken({ text })
    if (token !== validToken) {
      return new Response('Invalid', { status: 401 })
    }

    const fontNotoData = await fetchGoogleFont('Noto+Sans+JP:wght@600', text)

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${constants.images.OGP_BG_URL})`,
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            padding: '108px 76px 76px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px'
            }}
          >
            <div
              style={{
                display: 'block',
                fontSize: 60,
                fontStyle: 'normal',
                fontFamily: 'NotoSansJP',
                letterSpacing: '-0.025em',
                color: constants.colors.deepGreen,
                lineHeight: 1.4,
                // ３行以上で省略
                lineClamp: 3
              }}
            >
              {text}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'NotoSansJP',
            data: fontNotoData,
            style: 'normal'
          }
        ]
      }
    )
  } catch (e: any) {
    console.log(e)
    return new Response(`Failed to generate the image`, { status: 500 })
  }
}

// const imageOgpBg = fetch(new URL('../../assets/images/OGP_bg.jpg', import.meta.url))
//   .then((res) => res.arrayBuffer())
//   .then((ab) => arrayBufferToDataURL(ab))
