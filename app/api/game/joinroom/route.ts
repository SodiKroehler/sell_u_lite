import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@lib/auth/authOptions";
import { getRoom } from '../../VANESSA/src/comps'
import * as crypto from "crypto";


interface tempThing {
    t: "new" | "old" | "fault",
    id: string,
    name: string
}

const chooseRoomId = async (user, candidateRoomName: any): Promise<tempThing> => {

    let resp: any

    if (candidateRoomName) {
        if (candidateRoomName === "newPrivate") {
            //private prefix w no game room means new room
            let newRoomId = crypto.randomUUID()
            let newRoomName = crypto.randomBytes(2).toString('hex');
            let deduplication = await prismaFlam.room.findFirst({
                where: {
                    OR: [
                        { id: newRoomId },
                        { name: newRoomName }
                    ],
                }
            })
            while (deduplication) {
                let newRoomId = crypto.randomUUID()
                let newRoomName = crypto.randomBytes(2).toString('hex');
                let deduplication = await prismaFlam.room.findFirst({
                    where: {
                        OR: [
                            { id: newRoomId },
                            { name: newRoomName }
                        ],
                    }
                })
            }
            resp = await ({ "t": "new", "id": newRoomId, "name": newRoomName })
        } else {
            let prevRoom = await prismaFlam.room.findFirst({
                where: { name: candidateRoomName }
            }).then(async (r) => {
                if (!r) {
                    resp = await ({ "t": "fault", "id": '', "name": '' })
                } else {
                    resp = await { "t": "old", "id": r.id, "name": r.name }
                }
            })
        }
    } else {
        const roomId = await getRoom(user)

        let prevRoom = await prismaFlam.room.findUnique({
            where: { id: roomId }
        })
        if (prevRoom) {
            resp = await ({ "t": "old", "id": roomId, "name": prevRoom.name ?? '' })
        } else {
            //creating new public room so get a name
            let newRoomName = crypto.randomBytes(64).toString('hex');
            let prevRoom = await prismaFlam.room.findUnique({
                where: { name: newRoomName }
            })
            while (prevRoom) {
                let newRoomName = crypto.randomBytes(64).toString('hex');
                let prevRoom = await prismaFlam.room.findUnique({
                    where: { name: newRoomName }
                })
            }
            resp = await ({ "t": "new", "id": roomId, "name": newRoomName })
        }
    }
    return resp
}


const newfuncy = async () => {
    return "string"
}
export async function POST(req: NextRequest, res: NextResponse) {

    const thing = await req.json();


    const session = await getServerSession(authOptions)

    const user = await prismaFlam.user.findUnique({
        where: { email: session?.user?.email ?? undefined },
        // data: {roomToken: {disconnect: true}}
    })

    await prismaFlam.roomToken.deleteMany({
        //shouldnt be more than one but jic
        where: { userId: user?.id },
    })


    // let newRoomName: Awaited<Promise<PromiseLike<string>>> = await newfuncy()
    let newRoomName: Awaited<tempThing> = await chooseRoomId(user, thing.roomName)
    // let newRoomName: Awaited<Promise<PromiseLike<tempThing>>> = await chooseRoomId(user, thing.roomName)
    if (newRoomName.t === "fault") {

        // return NextResponse.json({ error: 'Internal Server Error' }, { "status": 404, "statusText": "Not Found" })
        // return NextResponse.json({ error: 'Internal Server Error', "statusCode": 404, "description": "Not Found" })
        return new NextResponse("Error", { status: 404, statusText: "invalid URL" });
    }
    if (newRoomName.t === "new") {
        let newRoom = await prismaFlam.room.create({
            data: {
                id: newRoomName.id,
                name: newRoomName.name,
                private: (thing.roomName === "newPrivate")
            }
        })
    }
    const newRoomToken = await prismaFlam.roomToken.create({
        data: {
            room: { connect: { id: newRoomName.id } },
            user: { connect: { id: user?.id } }
        }
    })
    let resp = NextResponse.json({ roomName: newRoomName.name, roomId: newRoomName.id })
    resp.cookies.set("room", newRoomToken.id)
    return resp

}
