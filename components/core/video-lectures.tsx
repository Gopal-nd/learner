'use client'
import { useDiffentPhase, useQuizStore } from '@/zustand/firstphase'
import React from 'react'
import { YouTubeVideoCardPlayer } from './YouTubeVideoCardPlayer'

const VideoLectures = ({ subject }: { subject: string }) => {


  const dummyVideoLinks = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/C0DPdy98e4c",
    "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  ];

  const increment = useDiffentPhase((state) => state.increment)
  const phase = useDiffentPhase((state) => state.phase)

  const handleEnd = () => {
    increment(phase)
    console.log("All videos have been played!");
  };
    const score = useQuizStore((state)=>state.score)

  return (
    <div>
      <h1 className='text-center text-2xl'>You Have Scored {score} / 3 in Entrence Exam</h1>

      <h2 className="text-2xl font-semibold mb-4">Video Lectures on {subject}</h2>

      <YouTubeVideoCardPlayer videoLinks={dummyVideoLinks} onEnd={handleEnd} />


    </div>
  )
}

export default VideoLectures



