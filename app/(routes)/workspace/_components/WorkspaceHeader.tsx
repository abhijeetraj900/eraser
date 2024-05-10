import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import Image from "next/image";
import React from "react";

function WorkspaceHeader({onSave}:any) {
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Image src={"/logo-1.png"} alt="logo" height={40} width={40} />
        <h2>File Name</h2>
      </div>
      <div className=" flex gap-2 items-center">
      <Button className=" h-8 text-[12px] gap-2 bg-slate-500 hover:bg-slate-900"
      onClick={() => onSave()}
      >
          Save
          <Save className="h-4 w-4" />
        </Button>
        <Button className=" h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-900 ">
          Share
          <Link className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
