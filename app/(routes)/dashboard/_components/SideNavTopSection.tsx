import { ChevronDown, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

function SideNavTopSection({ user }: any) {
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "/Settings",
      icon: Settings,
    },
  ];

  const convex = useConvex();
  const [teamList, setTeamList] = useState<TEAM[]>();
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const router = useRouter();
  const onMenuClick= (item:any)=>{
    if(item.path){
      router.push(item.path);
    }
  
  }

  useEffect(() => {
    user && getTeamList();
  }, [user]);
  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    console.log(result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 hover:bg-gray-200 p-3 rounded-md cursor-pointer">
          <Image src="/logo-1.png" alt="logo" height={40} width={40} />
          <div>
            <h2 className="flex items-center gap-2 font-semibold  text-[17px]">
              {activeTeam?.teamName}
            </h2>
          </div>

          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4">
        <div>
          {teamList?.map((team, index) => (
            <h2
              key={index}
              className={`"text-gray-500 p-2 hover:bg-blue-500 hover:text-white
               rounded-lg mb-1 cursor-pointer ${activeTeam?._id === team._id && "bg-blue-500 text-white"}`}
              onClick={() => setActiveTeam(team)}
            >
              {team.teamName || "Select Team" }
            </h2>
          ))}
        </div>
        <Separator className="mt-2 bg-slate-200" />
        <div>
          {menu.map((item, index) => (
            <h2
              key={index}
              className="flex gap-2 items-center p-2 hover:bg-gray-200
             rounded-lg text-sm cursor-pointer "
              onClick={()=>onMenuClick(item)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2
              className="flex gap-2 items-center p-2 hover:bg-gray-200
             rounded-lg text-sm cursor-pointer "
            >
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </LogoutLink>
        </div>
        <Separator className="mt-2 bg-slate-200" />
        {user && (
          <div className="mt-2 flex gap-2 items-center">
            <Image
              src={user?.picture}
              className="rounded-full"
              alt="logo"
              height={40}
              width={40}
            />
            <div>
              <h2 className="text-[14px] font-semibold">
                {user?.given_name}
                {user?.family_name}
              </h2>
              <h2 className="text-[12px] text-gray-400">{user?.email}</h2>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default SideNavTopSection;
