import GameRoom from './../components/GameRoom'
import { getServerSession } from "next-auth/next"
import { authOptions } from "./../lib/auth/authOptions";
import { redirect } from 'next/navigation'


export default async function Game() {
  const session = await getServerSession(authOptions)

  if (session) {
    return (
      <GameRoom pusherKey={process.env.PUSHER_KEY}
        pusherCluster={process.env.PUSHER_CLUSTER}
        userID={session.user.email} />
    );
  } else {
    redirect('/signin')
  }
}

