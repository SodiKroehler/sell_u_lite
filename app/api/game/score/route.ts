import { NextResponse, NextRequest} from 'next/server'
import { prismaFlam } from "../../../lib/prismaFlam";
import {getServerSession} from "next-auth/next"
import {authOptions} from '../../../lib/auth/authOptions'

export async function GET(req: NextRequest, res: NextResponse) {

    const session = await getServerSession(authOptions)
    const futypescript = session?.user?.email?session?.user?.email:undefined
    const user = await prismaFlam.user.findUnique ({
        where : {email: futypescript},
    })
  
    const uther = await prismaFlam.user.findUnique({
      where : {id: user?.id}})
  
    if (uther){
      return NextResponse.json({score: uther.score})
    } else {
      return NextResponse.json({status: 400})
    }
  
  }