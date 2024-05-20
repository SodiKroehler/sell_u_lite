import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";
import pusherServerFlam from "../../../lib/pusherServerFlam";


const GAMEROOMSIZE = 1;

export async function POST(req: NextRequest, res: NextResponse) {

  const thing = await req.json();
  const roomCookie = req.cookies.get("room")
  const tok = await prismaFlam.roomToken.findUnique ({
      where : {id: roomCookie?.value},})
  if (!tok) {return NextResponse.json({status: 400})}



  const aVote = await prismaFlam.vote.create ({
    data: {
      user: {connect: {id: tok?.userId}},
      room: {connect: {id: tok?.roomId}},
      chit: {connect: {id: thing.cardId}},
      guessedUser: tok?.userId,
    }
  })

  const allVotes = await prismaFlam.vote.findMany ({
    where:{roomId: tok?.roomId},
    select:{chit:true}
  })

  const allPlayerTokens = await prismaFlam.roomToken.findMany({
    where:{roomId: tok.roomId},
  })

  const players = {}
  for (let p in allPlayerTokens){
    const u = await prismaFlam.user.findUnique({
      where:{id: allPlayerTokens[p].userId}
    })
    // players[allPlayerTokens[p].userId] = u?.icon
    players[allPlayerTokens[p].id] = u?.icon
  }

  if (allVotes.length >= GAMEROOMSIZE){
    pusherServerFlam(tok.roomId, "submissionsComplete", allVotes)
    console.log(allVotes)
  }

  
  return NextResponse.json({players})

}