"use server"
import {prisma} from "@/lib/prisma"
import {currentUser} from "@/modules/auth/actions/index"
import { revalidatePath } from "next/cache";
import type { CreatePlaygroundInput } from "@/modules/types";
import { tr } from "date-fns/locale";


export const toggleStarMarked = async(playgroundId:string, isChecked:boolean) =>{
    const user = await currentUser();
    const userId = user?.id
    if(!userId){
        throw new Error("User Id is Required")
    }

    try {
        if(isChecked){
            await prisma.starMark.create({
                data:{
                    userId:userId!,
                    playgroundId,
                    isMarked: isChecked
                },
            });
        }
        else{
           await prisma.starMark.delete({
                where:{
                    userId_playgroundId:{
                        userId,
                        playgroundId: playgroundId
                    }
                },
            });
        }

        revalidatePath("/dashboard")
        return {success: true, isMarked:isChecked};
    } catch (error) {
        console.error("Error updating problem:", error);
        return {success:false, error:"Failed to update problem"};
    }
}

export const getAllPlaygroundForUser = async()=>{
     const user = await currentUser();

     try {
        const playground = await prisma.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user:true,
                Starmark:{
                    where:{
                        userId:user?.id!
                    },
                    select:{
                        isMarked:true
                    }
                }
            }
        })

        return playground;
     } catch (error) {
        console.log(error);
     }
}


export const createPlayground = async(data: CreatePlaygroundInput)=>{
    const user = await currentUser();

    const {template, title, description} = data;

    try {
        const playground = await prisma.playground.create({
            data:{
                title:title,
                description:description,
                template:template,
                userId:user?.id!
            }
        })

        return playground;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProjectById = async(id:string)=>{
    try {
        await prisma.playground.delete({
            where:{
                id
            }
        })

        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error);
    }
}

export const editProjectById = async(id:string, data: {title:string,description:string})=>{
    try {
        await prisma.playground.update({
            where:{
                id
            },
            data:data
        })
    } catch (error) {
     console.log(error);
    }
}

export const duplicateProjectById = async(id:string)=>{
    try {
        const originalPlayground = await prisma.playground.findUnique({
            where:{id},
        })

        if(!originalPlayground){
            throw new Error("Original playground not found");
        }

        const duplicateProjectById = await prisma.playground.create({
            data:{
                title:`${originalPlayground.title} (copy)`,
                description:originalPlayground.description,
                template:originalPlayground.template,
                userId: originalPlayground.userId
            }
        })

        revalidatePath("/dashboard")
        return duplicateProjectById;
    } catch (error) {
        console.log(error);
    }
}