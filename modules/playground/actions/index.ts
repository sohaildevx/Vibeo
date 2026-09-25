"use server"
import {prisma} from "@/lib/prisma"

export const getPlaygroundById = async(id:string)=>{
    try {
        const playground = await prisma.playground.findUnique({
            where:{
                id
            },
            select:{
                templatefiles:{
                    select:{
                        content:true
                    }
                }
            }
        })
        return playground
    } catch (error) {
        console.log(error)
    }
}