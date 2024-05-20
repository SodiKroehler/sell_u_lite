import { NextResponse, NextRequest } from 'next/server'
import { prismaFlam } from "../../lib/prismaFlam";


export async function GET(req: NextRequest) {
  //name

  const floID = req.nextUrl.searchParams.get("floID")

  const flo = await prismaFlam.flo.findUnique({
    where: {
      id: floID ?? ''
    },
    select: {
      chits: true,
    }
  })

  return NextResponse.json({ flo })
}


// export async function POST(req: NextRequest) {
//   //name

//   const artist = req.nextUrl.searchParams.get("artist")
//   const album = req.nextUrl.searchParams.get("album")
//   const colname = artist + "_" + album

//   const chit = await prismaFlam.collection.create({
//     data: {
//       artist: artist ? artist : '',
//       album: album ? album : '',
//       name: colname
//     },
//   });

//   return NextResponse.json({ chit })
// }

// export async function DELETE(req: NextRequest) {
//   //name

//   // const name = req.nextUrl.searchParams.get("name")

//   const chit = await prismaFlamClient.collection.deleteMany({})

//   return NextResponse.json({chit})
// }