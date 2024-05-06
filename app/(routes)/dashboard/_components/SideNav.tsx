import React, { use, useContext, useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const convex = useConvex();
  const createFile=useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const {fileList_,setFileList_} = useContext(FileListContext);


  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);


  const onFileCreate = (fileName: string) =>{
    console.log(fileName);
    createFile({
      fileName:fileName,
      createdBy:user?.email,
      teamId:activeTeam?._id,
      archive:false,
      document:"",
      whiteboard:""
    }).then((resp)=>{
      if(resp){
        getFiles();
        toast.success("File Created Successfully")
      }
    },(e)=>{
      toast.error("Error in creating file")
    })
    
    
  }

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {teamId: activeTeam?._id});
    console.log("Files", result);
    setTotalFiles(result?.length);
    setFileList_(result);
  }

  const [totalFiles, setTotalFiles] = useState<Number>(0);
  
  return (
    <div className="border-[1px] h-screen w-72 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection user={user}
        setActiveTeamInfo={(activeTeam:any)=>setActiveTeam(activeTeam)}

        />
      </div>
      <div>
        <SideNavBottomSection 
        totalFiles={totalFiles}
        onFileCreate={onFileCreate}
        
        />
        
      </div>
    </div>
  );
};

export default SideNav;
