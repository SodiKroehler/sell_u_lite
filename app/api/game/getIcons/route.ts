import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";
import { debug } from "@lib/logger/flamLogger"



export async function GET(req: NextRequest) {

    const roomCookie = req.cookies.get("room")

    if (!roomCookie) {
        return NextResponse.json({ status: 403 });
    }

    const roomToken = await prismaFlam.roomToken.findUnique({
        where: { id: roomCookie?.value },
    })
    if (!roomToken) {
        return NextResponse.json({ status: 403 });
    }

    var repo: NextResponse = NextResponse.json({ status: 200 });

    let players = await prismaFlam.roomToken.findMany({
        where: { roomId: roomToken?.roomId ?? undefined },
        select: { user: true }
    })

    let icons = ['☠️', '💩', '😈', '🐶', '🐱']
    for (let idx in players) {
        const icon = players[idx].user.icon
        icons = icons.filter(ic => ic != icon)
    }

    // debug(icons)

    repo = NextResponse.json({ icons: icons })
    return repo
}
