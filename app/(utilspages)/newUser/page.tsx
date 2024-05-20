import React from "react";
import { prismaFlam } from "../../lib/prismaFlam";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth/authOptions";
// import { redirect, useRouter } from 'next/navigation'
import NewUserModal from './../../components/NewUserModal'
import { generateUsername } from "unique-username-generator";

export default async function NewUser() {
    const username = generateUsername()
    const session = await getServerSession(authOptions);
    return (<NewUserModal email={session?.user?.email} possTag={username}/>)
}

  