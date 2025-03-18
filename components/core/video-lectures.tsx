'use client'
import { useDiffentPhase } from '@/zustand/firstphase'
import React from 'react'

const VideoLectures = ({ subject}: { subject: string}) => {
  const videos = [
    { title: `Introduction to ${subject}`, url: 'https://www.youtube.com/embed/sample1' },
    { title: `${subject} Advanced Concepts`, url: 'https://www.youtube.com/embed/sample2' }
  ]

     const increment = useDiffentPhase((state)=>state.increment)
     const phase = useDiffentPhase((state)=>state.phase)
  

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Video Lectures on {subject}</h2>
      {videos.map((video, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium">{video.title}</h3>
          <iframe src={video.url} width="100%" height="300" allowFullScreen></iframe>
        </div>
      ))}
      <button className="mt-4 px-4 py-2 rounded-lg hover:bg-muted" onClick={()=>increment(phase)}>
        Proceed to Final Exam
      </button>
    </div>
  )
}

export default VideoLectures
