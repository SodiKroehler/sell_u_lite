import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";
import pusherServerFlam from "../../../lib/pusherServerFlam";
import {swapChit} from '../../VANESSA/src/comps'


export async function POST(req: NextRequest, res: NextResponse) {
  
    const thing = await req.json();
  
    const roomCookie = req.cookies.get("room")
    const tok = await prismaFlam.roomToken.findUnique ({
        where : {id: roomCookie?.value},})
    if (!tok) {return NextResponse.json({status: 403})}

    const newIdx = await swapChit(tok.userId, thing.index, thing.cardId, thing.reason)

    const newChit = await prismaFlam.chit.findUnique({
        where: {id: newIdx}
    })

    console.log(newIdx)
  return NextResponse.json({index: thing.index, chit: newChit })
}