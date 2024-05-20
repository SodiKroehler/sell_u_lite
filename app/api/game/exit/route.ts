import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";

export async function POST(req: NextRequest, res: NextResponse) {

    const thing = await req.json();
    const roomCookie = req.cookies.get("room")


    const playersinRoom = await prismaFlam.roomToken.findMany ({
        where : {id: roomCookie?.value},
    })
    if (playersinRoom.length < 1) {return NextResponse.json({status: 400})}

    if (playersinRoom.length === 1) {
        await prismaFlam.room.delete({
            where: {id: playersinRoom[0].roomId},
        })
    } else {
        await prismaFlam.roomToken.delete({
            where: {id: roomCookie?.value},
        })
    }

    return NextResponse.json({status: 200})
}
  