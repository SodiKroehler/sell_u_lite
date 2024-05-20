import { NextResponse, NextRequest } from 'next/server'
import { debugm } from "@lib/logger/flamLogger"
const Pusher = require('pusher');
// import pusherServerFlam from "@lib/pusherServerFlam";
import { prismaFlam } from "@lib/prismaFlam";

export async function POST(req: NextRequest, res: NextResponse) {

    const b = await req.body!.getReader().read()
    const decoder = new TextDecoder();
    const string = decoder.decode(b.value);
    const splitString = string.split("&")
    const socketID = splitString[0].split("=")[1]
    const channelName = splitString[1].split("=")[1]


    const roomCookie = req.cookies.get("room")

    const {
        PUSHER_APP_ID: appId,
        PUSHER_KEY: key,
        PUSHER_SECRET: secret,
        PUSHER_CLUSTER: cluster,
    } = process.env;

    const dasPusher = new Pusher({ appId, key, secret, cluster });



    if (!roomCookie) {
        return NextResponse.json({ status: 403 });
    }

    const roomToken = await prismaFlam.roomToken.findUnique({
        where: { id: roomCookie?.value },
    })

    if (!roomToken) {
        return NextResponse.json({ status: 403 });
    }

    const proposedRoomName = channelName.substring(channelName.length - 36)

    if (roomToken.roomId !== proposedRoomName) {
        return NextResponse.json({ status: 403 });
    }

    const updateSocketResult = await prismaFlam.roomToken.update({
        where: { id: roomCookie?.value },
        data: { socketId: socketID }
    })

    var presenceData = {
        user_id: socketID,
        user_info: {
            room: roomCookie,
            uname: "purpleRain"
        }
    };

    let auth = dasPusher.authenticate(socketID, channelName, presenceData);

    return NextResponse.json(auth)
}