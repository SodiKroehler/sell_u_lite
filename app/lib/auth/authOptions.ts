import NextAuth, { type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter } from "next-auth/adapters";
import { prismaFlam } from "../prismaFlam";
import EmailProvider from "next-auth/providers/email";
import { flamSendVerificationRequest } from "./authEmail"
import { debug, debugm } from '../../lib/logger/flamLogger'
import GoogleProvider from "next-auth/providers/google"
import FBProvider from "next-auth/providers/facebook"
import DiscordProvider from "next-auth/providers/discord";
import { waitUntil } from '@vercel/functions';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: 'smtp.gmail.com',
      from: process.env.GMAIL_SERVICE_USER,
      sendVerificationRequest(params) {
        // return flamSendVerificationRequest(params).then(() => { debug("works") })
        waitUntil(flamSendVerificationRequest(params));
      }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    FBProvider({
      clientId: process.env.META_CLIENT_ID ?? '',
      clientSecret: process.env.META_CLIENT_SECRET ?? '',
    })
  ],
  pages: {
    // verifyRequest: '/utils/verify',
    signIn: '/signin',
    newUser: '/newUser',
  },
  adapter: PrismaAdapter(prismaFlam) as Adapter,
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //remove this after testing:
      const whiteList = ["sodikroehler@gmail.com", "sodikroehler@outlook.com", "tia_mada@chitters.net"]
      if (user?.email ?? '' in whiteList) {
        return true
      }
      return false
      // return true
    },
    async redirect({ url, baseUrl }) {
      const newURL = `${baseUrl}${url}`;
      if (url.startsWith('/')) return newURL
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  }
}
