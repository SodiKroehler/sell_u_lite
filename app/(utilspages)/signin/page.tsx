import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth/authOptions";
import SignInModal from './../../components/SignInModal'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  const csrfToken = await getCsrfToken()
  
  if (session) {
    redirect('/')
  }
  
  return (
    <SignInModal providers={providers} csrfToken={csrfToken} />
  )
}
