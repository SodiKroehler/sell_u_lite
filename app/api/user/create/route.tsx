import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";
import { userModel, getVANESSAId } from './../../VANESSA/src/comps'


export async function POST(req: NextRequest, res: NextResponse) {

    const thing = await req.json()

    const newUserModel: userModel = {
        email: thing?.email,
        fullName: thing?.realName,
        displayName: thing?.displayName,
        robot: thing?.robot,
        inkBlot: thing?.inkBlot,
        greg: thing?.greg,
        pwd: thing?.password,
        ts: thing?.ts,
        ethics: thing?.kant,
        age: thing?.adult,
    }

    const vanId = await getVANESSAId(newUserModel)

    const chitter_debut_light = await prismaFlam.flo.findFirst({
        where: { name: "chitter_debut_light" }
    })

    const updatedUser = await prismaFlam.user.update({
        where: { email: thing?.email ?? '' },
        data: {
            name: thing.realName,
            displayName: thing.publicName,
            vanessaId: vanId,
            library: { connect: { id: chitter_debut_light?.id ?? '' } }
        },
    })


    return NextResponse.json({ status: 200 })
}
