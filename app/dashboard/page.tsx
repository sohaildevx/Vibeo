import React from "react";
import AddNewButton from "@/modules/dashboard/components/Add-new";
import AddRepo from "@/modules/dashboard/components/Add-repo";
import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import Emptystate from "@/modules/dashboard/components/Empty-State";
import ProjectTable from "@/modules/dashboard/components/Project-table"
import { deleteProjectById, duplicateProjectById, editProjectById } from "@/modules/dashboard/actions/index";

const page = async () => {
  const Playgrounds = await getAllPlaygroundForUser();
  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {Playgrounds && Playgrounds.length === 0 ? (
          <Emptystate />
        ) : (
          <ProjectTable
            projects={Playgrounds || []}
            onDeleteProject={deleteProjectById}
            onUpdateProjct={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default page;
