import { PrismaClient } from "@prisma/client"



const globalForPrisma = global as unknown as {
    prismaFlam: PrismaClient | undefined
}


export const prismaFlam = globalForPrisma.prismaFlam ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaFlam = prismaFlam;

// const prisma = new PrismaClient().$extends({
//     result: {
//       chit: {
//         fullname: {
//           needs: { id: true, desc: true, collectionId: true },
//           compute(chit) {
//             return `${chit.collectionId}_${chit.id}_${chit.desc}`
//           },
//         },
//       },
//     },

