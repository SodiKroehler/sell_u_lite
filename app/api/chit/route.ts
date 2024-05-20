import { NextResponse, NextRequest} from 'next/server'
// import { flamClient } from "../../lib/flamClient.js";
import { prismaFlam } from "../../lib/prismaFlam";
// import multer from 'multer'
import {getChit} from './../VANESSA/src/comps'


// const upload = multer()

export async function GET(req: NextRequest) {

  const roomCookie = req.cookies.get("room")
  const rawid =req.nextUrl.searchParams.get("id")
  const id = rawid?rawid:undefined

  if(roomCookie){//is internal request
    const roomToken = await prismaFlam.roomToken.findUnique({
      where:{id: roomCookie.value}
    })
    const idFromVANESSA = await getChit(roomToken?.userId, id);
    const chit = await prismaFlam.chit.findUnique({
      where: {
        id: idFromVANESSA,
      },
    })
    return NextResponse.json({chit})
  } else {
    const chit = await prismaFlam.chit.findUnique({
      where: {
        id: id,
      },
    })
    return NextResponse.json({chit})
  } 
}

// export async function POST(req: NextRequest) {
//   //name

//   const artist = req.nextUrl.searchParams.get("artist")
//   const album = req.nextUrl.searchParams.get("album")
//   const desc = req.nextUrl.searchParams.get("desc").toUpperCase()
//   const id = parseInt(req.nextUrl.searchParams.get("id"))
//   const colname = artist + "_" + album

//   try {
//     const chit_initzer = await prismaFlam.chit.create({
//       data: {
//         fullname: desc,
//         collectionID: colname,
//         link: "",
//         id: id,
//       },
//     });

//     const chit = await chit_initzer;

//     try {
//       const newFileName = chit.collectionID + "_" + chit.id.toString() + "_" + chit.fullname;
//       const awsLink = "https://chits-video.s3.amazonaws.com/" + newFileName + ".mp4";
//       const imgLink = "https://chits-video.s3.amazonaws.com/PREVIEW_" + newFileName + ".png";
//       const chitToReturn = await prismaFlam.chit.update({
//         where: {
//           id: chit.id
//         },
//         data : {
//           fullname: newFileName,
//           link: awsLink,
//           gif: imgLink
//         }});

//       return NextResponse.json({chitToReturn})
//     }catch (e) {
//       return NextResponse.json({e})
//     }
//   } catch (e) {
//     return NextResponse.json({e})
//   }
//   return NextResponse.json({undefined})
// }




//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const config = {
//   api: {
//     bodyParser: false
//   },
// }



//BUSBOYYY


// console.log(req.headers)

// const bb = busboy({headers: req.headers});
// bb.on('file', (name, file, info) => {
//   const {filename, encoding, mimeType} = info;

//   console.log(
//     `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
//     filename,
//     encoding,
//     mimeType
//   );

//   file.on('data', (data) => {
//     console.log(`File [${name}] got ${data.length} bytes`);
//   }).on('close', () => {
//     console.log(`File [${name}] done`);
//   });
// })

// bb.on('field', (name, val, info) => {
//   console.log(`Field [${name}]: value: %j`, val);
// });

// bb.on('close', () => {
//   console.log('Done parsing form!');
//   return NextResponse.json({status: "cool"})
// });
// // req.pipe(bb);
// req.body.pipeThrough(bb)


// console.log(chit)

// await flamClient.putObject({
//   Bucket: process.env.AWS_S3_BUCKET_NAME,
//   Key: filename,
//   Body: req.body.pipeThrough,
// }, (perr, pres) => {
//   if (perr) {
//     console.log("error uploading data " + perr)
//   } else {
//     console.log("success in uploading to bucket")
//   }
// }).promise();