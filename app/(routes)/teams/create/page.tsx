"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const createTeam= useMutation(api.teams.createTeam);
  const {user} : any= useKindeBrowserClient();
  const router = useRouter();
  const createNewTeam=() =>
    {
      createTeam({
        teamName:teamName,
        createdBy:user?.email
      }).then(resp=>{
        console.log(resp);

        if(resp){
          router.push('/dashboard')
          toast('Team created successfully')
        }
      })
    }
  return (
    <div className='px-6 md:px-16 my-16'>
      <Image src ='/logo-black.png' alt='logo'
      height={200}
      width={200}
      />
      <div className='flex flex-col items-center mt-8'>
        <h2 className='font-bold text-[40px] py-3'>What should be call your team?</h2>
        <h2 className='text-gray-500'>You can change it later in settings</h2>
        <div className='mt-7  w-[40%]'>
          <label className='text-gray-500'>Team Name</label>
          <Input placeholder='Team Name' className='mt-4'
          onChange={(e)=>setTeamName(e.target.value)}
          
          />
        </div>
        <Button className='bg-blue-500 mt-9 w-[20%] hover:bg-blue-700'
        disabled={!(teamName&&teamName?.length>0)}
        onClick={()=>createNewTeam()}
        >Create Team</Button>
      </div>
    </div>
  )
}

export default CreateTeam