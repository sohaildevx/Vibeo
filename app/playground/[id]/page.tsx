"use client"
import { useParams } from 'next/navigation';
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import {
  TemplateFile,
  TemplateFolder,
} from "@/modules/playground/lib/path-to-json";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";

const MainPlaygroundPage = () => {
    const {id} = useParams<{id:string}>();
     const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);

    const activeFile = "sample.txt"
  return (
    <TooltipProvider>
      <>
      <TemplateFileTree
          data={templateData!}
          selectedFile={activeFile}
          title="File Explorer"
        />z
        <SidebarInset>
            <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
            </header>

            <div className="flex flex-1 items-center gap-2">
                 <div className="flex flex-col flex-1">
                  <h1 className="text-sm font-medium">
                         {playgroundData?.title || "Code Playground"}  
                  </h1>
                 </div>
            </div>
        </SidebarInset>
      </>
    </TooltipProvider>
  )
}

export default MainPlaygroundPage
