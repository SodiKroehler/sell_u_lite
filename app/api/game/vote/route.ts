import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";
import {getPrompt} from './../../VANESSA/src/comps'
import pusherServerFlam from "../../../lib/pusherServerFlam";


const GAMEROOMSIZE = 1;

export async function POST(req: NextRequest, res: NextResponse) {
  
  const thing = await req.json();

  const roomCookie = req.cookies.get("room")
  const tok = await prismaFlam.roomToken.findUnique ({
      where : {id: roomCookie?.value},})
  if (!tok) {return NextResponse.json({status: 400})}


  for (let vote in thing.subs){
    //roomtokenid : cardId
    const guessedId = await prismaFlam.roomToken.findUnique({
      where: {id: vote}
    })
    await prismaFlam.vote.create ({
      data: {
        user: {connect: {id: tok.userId}},
        room: {connect: {id: tok.roomId}},
        chit: {connect: {id: thing.subs[vote]}},
        guessedUser: guessedId?.userId,
      }
    })
  }

  const room = await prismaFlam.room.update({
    where:{id: tok.roomId},
    data: {votesRecieved: {increment: 1}}
  })

  if (room.votesRecieved>= GAMEROOMSIZE){

    const trueVotes = await prismaFlam.vote.findMany({
      where: {
          roomId: room.id,
          userId: {equals: prismaFlam.vote.fields.guessedUser}
      }
    })

    const voterDict = {}
    for (let i=0; i<GAMEROOMSIZE; i++){
      voterDict[trueVotes[i].userId] = trueVotes[i].chitId;
    }

    for (let voter in voterDict){
      let numCorrect = 0;
      const votersVotes = await prismaFlam.vote.findMany({
        where:{userId: voter}
      })
      for (let guess in votersVotes){
        const idx = votersVotes[guess].guessedUser
        if (idx && votersVotes[guess].chitId === voterDict[idx]){
          numCorrect +=1;
        }
      }

      await prismaFlam.user.update({
        where:{id: voter},
        data:{score: {increment: numCorrect}}
      })

      pusherServerFlam(tok.roomId, "votingCompleted", voterDict) 
    }
  }

  return NextResponse.json({status: 200})
}