import { prismaFlam } from "@lib/prismaFlam";
import { NextResponse, NextRequest } from 'next/server'
import { LEVEL } from "@prisma/client";




interface Chit {
    name: string,
    collection: any,
    // collectionID: string,
    link: string,
    gif: string
}

const addChit = async (floName, chitName, level) => {
    const awsPrefix = "https://chits-video.s3.amazonaws.com/chitters_debut_" + chitName + ".mp4"
    const awsPrevfix = "https://chits-video.s3.amazonaws.com/PREVIEW_chitters_debut_" + chitName + ".png"

    const prevOnan = await prismaFlam.chit.findFirst({
        select: {
            flo: { where: { name: floName } },
            name: chitName
        },
    })

    const prevOnanSeed = await prismaFlam.flo.findFirst({
        where: { name: floName },
    })

    if (prevOnan && prevOnanSeed?.level === level) {
        const onan = await prismaFlam.chit.create({
            data: {
                name: chitName,
                flo: { connect: { id: prevOnanSeed?.id ?? "" } },
                link: awsPrefix,
                gif: awsPrevfix,
                level: level
            }
        })

    }

}

const addPrompt = async (da) => {
    const onan = await prismaFlam.prompt.create({
        data: { prompt: da, }
    })
}

// export async function GET(req: NextRequest) {

//     const hackAuthThing = req.nextUrl.searchParams.get("adminAuthCode")
//     const action = req.nextUrl.searchParams.get("action")

//     if (hackAuthThing !== process.env.VANESSA_SPECIAL_ADMIN_CODE) {
//         return NextResponse.json({ status: 403 })
//     } else {
//         switch (action) {
//             case 'seed':

//                 const col = await prismaFlam.collection.upsert({
//                     where: { name: "chitters_debut" },
//                     update: { name: "chitters_debut" },
//                     create: { artist: "chitters", album: "debut", name: "chitters_debut" }
//                 })

//                 pg_chits.map((chit) => addChit(chit))
//                 pg_prompts.map((d) => addPrompt(d))
//         }
//     }



//     return NextResponse.json({ status: 200 })
// }

// export async function DELETE(req: NextRequest) {

//     const hackAuthThing = req.nextUrl.searchParams.get("adminAuthCode")
//     const action = req.nextUrl.searchParams.get("action")

//     if (hackAuthThing !== process.env.VANESSA_SPECIAL_ADMIN_CODE) {
//         return NextResponse.json({ status: 403 })
//     } else {
//         const chit = await prismaFlam.chit.deleteMany({})
//         const collection = await prismaFlam.collection.deleteMany({})
//         return NextResponse.json({ status: 200 })
//     }
// }