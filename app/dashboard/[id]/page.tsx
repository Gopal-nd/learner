'use client'
import AiQuiz from "@/components/core/AiQuiz"
import FinalQuiz from "@/components/core/final-quiz"
import Main from "@/components/core/Main"
import VideoLectures from "@/components/core/video-lectures"


const LearningPage = async({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
 

  return (
   <Main id={id}/>
  )
}

export default LearningPage
