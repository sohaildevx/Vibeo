import {
  readTemplateStructureFromJson,
  saveTemplateStructureToJson,
} from "@/modules/playground/lib/path-to-json";
import { prisma } from "@/lib/prisma";
import { templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs/promises";
import { NextRequest } from "next/server";

function validateJsonStructure(data: unknown):boolean{
    try {
        JSON.parse(JSON.stringify(data));
        return true;
    } catch (error) {
        console.error("Invalid JSON structure: ", error);
        return false
    }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
){
    const {id} = await params;

    if(!id){
        return Response.json({error:"Playground not found"}, {status:404});
    }

    const playground = await prisma.playground.findUnique({
        where:{id}
    })

    if(!playground){
        return Response.json({error: "Playground not found"}, {status:404})
    }
    const templateKey = playground.template as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey]

    try {
        const inputPath = path.join(process.cwd(), templatePath);
        const outPutFile = path.join(process.cwd(), `output/${templateKey}.json`)

        await saveTemplateStructureToJson(inputPath, outPutFile);
        const result = await readTemplateStructureFromJson(outPutFile)

        if(!validateJsonStructure(result.items)){
            return Response.json({error:"Invalid JSON structure"}, {status:500})
        }

        await fs.unlink(outPutFile)

        return Response.json({success: true, templateJson: result}, {status:200})
    } catch (error) {
        console.log(error);
        
    }
}
