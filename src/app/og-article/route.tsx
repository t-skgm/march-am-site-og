import { ImageResponse } from 'next/server'
import { ServerRuntime } from 'next'
import { getValidToken } from '../../utils/encrypt'
import { constants } from '../../constants'
import { arrayBufferToDataURL } from '../../utils/arrayBufferToDataURL'

export const runtime: ServerRuntime = 'edge'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const title = searchParams.get('title')

    const token = searchParams.get('i')
    const validToken = await getValidToken({ title })
    if (token !== validToken) {
      return new Response('Invalid', { status: 401 })
    }

    const fontNotoData = await fontNoto
    const imageOgpBgDataUrl = await imageOgpBg

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: `url(${imageOgpBgDataUrl})`,
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
              {title}
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

const fontNoto = fetch(new URL('../../assets/fonts/NotoSansJP-SemiBold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer()
)
const imageOgpBg = fetch(new URL('../../assets/images/OGP_bg.jpg', import.meta.url))
  .then((res) => res.arrayBuffer())
  .then((ab) => arrayBufferToDataURL(ab))
