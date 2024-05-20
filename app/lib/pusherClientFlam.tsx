// import Pusher from 'pusher-js';
// import dynamic from 'next/dynamic'\
// import {
//     Pusher,
//     PusherMember,
//     PusherChannel,
//     PusherEvent,
// } from '@pusher/pusher-websocket-react-native';

// export const flamPusher = new Pusher(process.env.pusherKey ?? '', { cluster: process.env.pusherCluster ?? '' })

// export async function getFlamPusher() {
//     let flamPusher: any = undefined;

//     // const handler = (e) => {
//     //     debugm("pusher conn state change", e)
//     // }

//     if (window) {
//         try {
//             flamPusher = Pusher.getInstance();
//             // const newPusher = await new Pusher(process.env.pusherKey ?? '', { cluster: process.env.pusherCluster ?? '' })
//             if (flamPusher) {
//                 await flamPusher.init({
//                     apiKey: process.env.PUSHER_KEY ?? '',
//                     cluster: process.env.PUSHER_CLUSTER ?? '',
//                     authEndpoint: '/api/pusherAuth' ?? '',
//                 });
//             }

//         } catch (e) {
//             console.log(e)
//         }
//     }
//     return flamPusher
// }
