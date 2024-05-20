import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";



// const upload = multer()

export async function GET(req: NextRequest) {

    const roomCookie = req.cookies.get("room")
    const num = req.nextUrl.searchParams.get("num")

    if (roomCookie) {//is internal request
        const roomToken = await prismaFlam.roomToken.findUnique({
            where: { id: roomCookie.value }
        })

        const cards = await prismaFlam.chit.findMany({
            where: {
                level: 'LIGHT',
            },
        })
        const prompts = await prismaFlam.prompt.findMany({
            where: {
                level: 'LIGHT',
            },
        })

        const tiles: any = [];

        for (let i = 0; i < Number(num ?? 2); i++) {

            const newCard = Math.floor(Math.random() * (cards.length - 1)) + 1;
            const newPrompt = Math.floor(Math.random() * (prompts.length - 1)) + 1;

            tiles.push({ id: 0, chit: cards[newCard], prompt: prompts[newPrompt].prompt })
        }
        return NextResponse.json({ tiles })
    }
}