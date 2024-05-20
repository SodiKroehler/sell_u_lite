import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";

export interface userModel {
    email: String
    fullName: String,
    displayName: String,
    robot: String,
    inkBlot: String,
    greg: String,
    pwd: String,
    ts: String,
    ethics: String,
    age: String,
}


export async function getRoom(userId) {
    return crypto.randomUUID()
}

export async function getChit(userId, cardIndex) {
    const cards = await prismaFlam.chit.findMany({})
    const newCardIdx = Math.floor(Math.random() * (cards.length-1)) +1;
    return cards[newCardIdx].id
}

export async function swapChit(userId, cardIndex, cardId, reason) {
    const cards = await prismaFlam.chit.findMany({})
    let newCardIdx = Math.floor(Math.random() * (cards.length-1)) +1; //plus one so no cardBack
    while (newCardIdx === cardId){
        newCardIdx = Math.floor(Math.random() * (cards.length-1)) +1;
    }
    
    return cards[newCardIdx].id
}

export async function getPrompt(userId) {
    const newPromptId = 1;
    return await prismaFlam.prompt.findUnique({
      where : {id: newPromptId}})
}

export function getVANESSAId(obj: userModel) : string{
    return ''
}



// export async function chitRecommender (information) {

//   const defaultCollection = await prismaFlamClient.collection.findUnique({
//     where: {
//       name: 'default'
//     }
//   });
//   const newIndexCard = (Math.floor(Math.random() * defaultCollection.chits.length));
//   const newCard = await prismaFlamClient.chits.findUnique({
//     where:{
//       id: defaultCollection.chits[newIndexCard].chitId
//     }
//   })

//   return newCard.url;
// }




// export async function getCollection(params) {
  
//   const reqCollection = await prismaFlamClient.collection.findUnique({
//     where: {
//       artist: CollectionAuthor,
//       album: CollectionName,
//     }
//   });

//   return reqCollection.id;
// // }
