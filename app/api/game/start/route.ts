import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";
import {getPrompt} from './../../VANESSA/src/comps'
import pusherServerFlam from "../../../lib/pusherServerFlam";


const GAMEROOMSIZE = 1;

export async function POST(req: NextRequest, res: NextResponse) {

    const thing = await req.json();
    const roomCookie = req.cookies.get("room")


    const roomToken = await prismaFlam.roomToken.findUnique ({
        where : {id: roomCookie?.value},
    })
    if (!roomToken) {return NextResponse.json({status: 400})}
    var repo: NextResponse = NextResponse.json({status: 200});

    await prismaFlam.user.update({
      where: {id: roomToken?.userId},
      data: {icon: thing.icon}
    })

    let room = await prismaFlam.room.update ({
      where : {id: roomToken?.roomId},
      data: {rdyPlayerCount: {increment: 1}}
    })

    if (room.rdyPlayerCount >= GAMEROOMSIZE){
        
        const newPrompt = await getPrompt(roomToken.userId)
        pusherServerFlam(roomToken.roomId, "start", null) 

      await prismaFlam.room.update ({
        where : {id: roomToken?.roomId},
        data: {prompt: {connect: {id: newPrompt?.id}}}
      })

      repo = NextResponse.json({prompt: await newPrompt})
    }

    return repo
}
  