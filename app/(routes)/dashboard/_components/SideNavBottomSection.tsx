import { Button } from "@/components/ui/button";
import { Archive, Files, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Constant from "@/app/_constant/Constant";
import PricingDialog from "./PricingDialog";

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      path: "/getting-started",
      icon: Flag,
    },
    {
      id: 2,
      name: "GitHub",
      path: " ",
      icon: Github,
    },
    {
      id: 3,
      name: "Archived",
      path: "/getting-started",
      icon: Archive,
    },
  ];

  const [fileInput, setFileInput] = useState(" ");
  return (
    <div>
      {menuList.map((item, index) => (
        <div
          key={index}
          className="flex items-center  p-2 gap-2 
         hover:bg-slate-200 rounded-md cursor-pointer border-fuchsia-100"
        >
          <item.icon size={20} />
          <span>{item.name}</span>
        </div>
      ))}

      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full justify-start gap-3 font-semibold mt-1 ">
            <Files className="h-4 w-4" />
            New File
          </Button>
        </DialogTrigger>
        {totalFiles<Constant.MAX_FREE_FILE?<DialogContent>
          <DialogHeader>
            <DialogTitle>Create file</DialogTitle>
            <DialogDescription>
              <Input
                placeholder="File Name"
                className="mt-3"
                onChange={(e) => {
                  setFileInput(e.target.value);
                }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button
                type="button"
                className=" bg-slate-700 hover:bg-slate-900"
                               
                disabled={!(fileInput && fileInput.length > 3)}
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>:<PricingDialog/>}
      </Dialog>

      <div>
        <Progress value={(totalFiles/5)*100} className="mt-4 w-full bg-slate-300" />
        <h2 className="text-[12px] mt-2">
          <strong>{totalFiles}</strong> Out <strong>{Constant.MAX_FREE_FILE}</strong> is used
        </h2>
        <h2 className="text-[12px]">Upgrade your plan for unlimited access</h2>
      </div>
    </div>
  );
}

export default SideNavBottomSection;
