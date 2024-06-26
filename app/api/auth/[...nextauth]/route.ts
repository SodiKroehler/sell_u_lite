import NextAuth, { type NextAuthOptions } from "next-auth"
import { authOptions } from '@lib/auth/authOptions'
import { NextApiRequest, NextApiResponse } from 'next'


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
