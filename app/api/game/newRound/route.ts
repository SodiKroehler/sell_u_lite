import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";


export async function POST(req: NextRequest, res: NextResponse) {

    const thing = await req.json();
    const roomCookie = req.cookies.get("room")


    const roomToken = await prismaFlam.roomToken.findUnique ({
        where : {id: roomCookie?.value},
    })
    if (!roomToken) {return NextResponse.json({status: 400})}

    await prismaFlam.room.update({
      where: {id: roomToken?.roomId},
      data: {rdyPlayerCount: 0,
            votesRecieved: 0,
            prompt: {disconnect: true}
        }
    })

    return NextResponse.json({status: 200})
}
  