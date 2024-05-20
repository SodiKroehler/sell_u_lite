import { NextResponse, NextRequest } from 'next/server'
import { sendEmail } from "@lib/email/flamMailer"
import { prismaFlam } from "@lib/prismaFlam";


export async function POST(req: NextRequest, res: NextResponse) {

    const userEmail = req.nextUrl.searchParams.get("userEmail")
    const floId = req.nextUrl.searchParams.get("floId")

    const user = await prismaFlam.user.findUnique({
        where: { email: userEmail ?? '' }
    })
    const flo = await prismaFlam.flo.findUnique({
        where: { id: floId ?? '' }
    })

    if (user && flo) {
        const updatedUser = await prismaFlam.user.update({
            where: { id: user.id },
            data: {
                library: {
                    connect: { id: flo.id }
                }
            },
        })
    }

    return NextResponse.json({ "status": 200 })
}