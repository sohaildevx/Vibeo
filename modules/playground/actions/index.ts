"use server"
import {prisma} from "@/lib/prisma"
import { TemplateFolder } from "../lib/path-to-json";
import { currentUser } from "@/modules/auth/actions";
import { use } from "react";

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

export const SaveUpdatedCode = async(playgroundId:string, data:TemplateFolder)=>{
    const user = await currentUser();
    if(!user) return null;

    try {
        const updatePlayground = await prisma.templateFile.upsert({
            where:{
                playgroundId
            },

            update:{
                content:JSON.stringify(data)
            },
            create:{
                     playgroundId,
                     content:JSON.stringify(data)
            }
        })

        return updatePlayground;
    } catch (error) {
        console.log("saveUpdatedCode error:", error);
        return null;
    }
}