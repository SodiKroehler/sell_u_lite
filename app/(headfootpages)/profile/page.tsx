import React from "react";
import { prismaFlam } from "../../lib/prismaFlam";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth/authOptions";
import { redirect } from 'next/navigation'
import Profile from './../../components/Profile'
import { debug } from '../../lib/logger/flamLogger'



export default async function _Profile() {

  const session = await getServerSession(authOptions)

  if (session) {
    const email = session?.user?.email ?? undefined

    const user = await prismaFlam.user.findUnique({
      where: { email: email },
    })

    // const rooms = await prismaFlam.room.findMany({
    //   where: { email: email??'' },
    // })

    return (
      <Profile user={user} />
    );
  } else {
    redirect('/signin')
  }
}

