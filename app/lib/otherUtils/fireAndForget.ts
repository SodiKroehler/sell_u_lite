// import { NextRequest, NextFetchEvent } from 'next'

// export default async function handler(request: NextRequest, context: NextFetchEvent, funcy: any) {
//     context.waitUntil(
//         // edge function will wait until the promise is resolved/rejected
//         new Promise<void>(async (resolve, reject) => {
//             await funcy()
//             resolve()
//         })
//     )
//     // return the response so the caller doesn't have to wait
//     return new Response(`Working on it!`);
// }


// export function withFireAndForget() {
//     return async (funcy: any) => {
//         let promiseResolve: () => void = () => { throw Error("promiseResolved was not reassigned!") }
//         const finishedPromise = new Promise<void>((resolve) => {
//             promiseResolve = resolve;
//         });
//         const origEnd = res.end;
//         res.end = async function newEnd(this: NextApiResponse, ...args: unknown[]) {
//             await finishedPromise;
//             //@ts-ignore
//             return origEnd.call(this, ...args);
//         };

//         const result = await handler(req, res);
//         promiseResolve();
//         return result;
//     };
// }