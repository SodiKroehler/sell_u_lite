import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "@lib/prismaFlam";


export async function GET(req: NextRequest) {
    //name
    return NextResponse.json({ status: 403 })
}
