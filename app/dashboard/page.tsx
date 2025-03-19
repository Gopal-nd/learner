'use client'

import userDetails from '@/actions/userDetails'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth-client'
import { useDiffentPhase, useUserDetails } from '@/zustand/firstphase'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// Define types for cleaner code
interface UserDetails {
  school?: string;
  grade?: string;
  city?: string;
  country?: string;
}

const subjects: Record<string, string[]> = {
  Maths: ['Algebra', 'Geometry', 'Trigonometry'],
  Science: ['Biology', 'Physics', 'Chemistry'],
  Social: ['History', 'Geography', 'Economics'],
};

const DashboardPage: React.FC = () => {
  const reset = useDiffentPhase((state) => state.reset);
  const phase = useDiffentPhase((state) => state.phase);
  const userSubject = useUserDetails((state) => state.setSubject);
  useEffect(()=>{
    reset()
  })
  const session = useSession();
  const UserClass = useUserDetails((state:any)=>state.setClass)
  const { data: user, error, isFetching } = useQuery<any>({ queryKey: ['userDetails'], queryFn: userDetails });
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);


  if (isFetching) {
    return <div className="text-center py-10 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading user details. Please try again later.</div>;
  }

  
    UserClass(user.grade)
  
  return (
    <div className="p-2 rounded-xl shadow-lg mx-auto">
      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mb-8">Welcome, {session?.data?.user?.name || 'User'}! 🎉</h1>

      {/* User Info Section */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="space-y-3">
          <p><span className="font-semibold"> School:</span> {user?.school || 'N/A'}</p>
          <p><span className="font-semibold"> Grade:</span> {user?.grade || 'N/A'}</p>
        </div>
        <div className="space-y-3 text-right">
          <p><span className="font-semibold">City:</span> {user?.city || 'N/A'}</p>
          <p><span className="font-semibold">Country:</span> {user?.country || 'N/A'}</p>
        </div>
      </div>

      {/* Subject Selection Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What subject shall we learn today? 📖</h2>
        <div className="flex flex-wrap gap-4">
          {Object.keys(subjects).map((subject) => (
            <button
              key={subject}
              onClick={() =>{
                userSubject(subject)
                 setSelectedSubject(subject)}}
              className={`px-6 py-3 rounded-lg font-medium transition hover:bg-blue-500`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories Section */}
      {selectedSubject && (
        <div>
          <h3 className="text-2xl font-semibold mb-4">Explore {selectedSubject} Topics 🚀</h3>
          <div className="grid grid-cols-2 gap-4">
            {subjects[selectedSubject].map((topic) => (
             

              <Button
              onClick={()=>{
                redirect(`/dashboard/${topic}`)
              }}
                key={topic}
                className="px-6 py-3 rounded-lg font-medium transition hover:bg-blue-400"
                >
                {topic}
              </Button>
              
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
