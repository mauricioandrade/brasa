import { NextResponse } from 'next/server'

export const revalidate = 86400

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ photoUrl: null })
  }

  try {
    const res = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(name)}`,
      { next: { revalidate: 86400 } },
    )
    const data = (await res.json()) as {
      player: Array<{ strCutout?: string; strThumb?: string }> | null
    }
    const player = data?.player?.[0]
    const photoUrl = player?.strCutout || player?.strThumb || null
    return NextResponse.json({ photoUrl })
  } catch {
    return NextResponse.json({ photoUrl: null })
  }
}
