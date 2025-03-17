'use client'
import { Button } from '@/components/ui/button'
import { authClient, useSession } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react'

const HomePage = () => {
    const { data:session, error, isPending } = useSession()
  
  return (
    <div>
      <p>Home page</p>
    
    <div>{JSON.stringify(session,null,2)}</div>

      {session&& (<Button onClick={async()=>{
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/sign-in")
            },
          },
        });
      }}>
        Logout
      </Button>)}
      {session==null&& (<Button onClick={async()=>{
      
              redirect("/sign-in")
     

      }}>
        sign-in
      </Button>)}
    </div>
  )
}

export default HomePage