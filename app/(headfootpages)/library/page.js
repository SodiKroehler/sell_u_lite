import Library from '@components/Library'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@lib/auth/authOptions";
import { redirect } from 'next/navigation'
export default async function LibRoot() {

  const session = await getServerSession(authOptions)

  if (session) {
    const email = session?.user?.email ?? undefined

    const user = await prismaFlam.user.findUnique({
      where: { email: email },
      include: { library: true }
    })

    return (
      <Library library={user.library} />
    );
  } else {


    return (
      <Library library={[{ id: 'clrfcddlh0000tiigg2v6aan3' }]} />
    );
  }
}