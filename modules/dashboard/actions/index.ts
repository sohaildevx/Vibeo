"use server"
import {prisma} from "@/lib/prisma"
import {currentUser} from "@/modules/auth/actions/index"

export const getAllPlaygroundForUser = async()=>{
     const user = await currentUser();

     try {
        const playground = await prisma.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user:true
            }
        })

        return playground;
     } catch (error) {
        console.log(error);
     }
}