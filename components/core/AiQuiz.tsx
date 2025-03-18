'use client'
import React, { useState } from 'react'

const AiQuiz = ({ subject, onNext }: { subject: string; onNext: (score: number) => void }) => {
  const [score, setScore] = useState(0)
  
  const handleQuizSubmit = () => {
    // Simulating AI Quiz Score (Replace with actual API call)
    const finalScore = Math.floor(Math.random() * 11)
    setScore(finalScore)
    alert(`You scored ${finalScore}/10`)
    onNext(finalScore)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">AI Knowledge Quiz on {subject}</h2>
      <p>Answer the 10 AI-generated questions to test your current knowledge.</p>
      <button className="mt-4 px-4 py-2 rounded-lg hover:bg-muted" onClick={handleQuizSubmit}>
        Submit Quiz
      </button>
    </div>
  )
}

export default AiQuiz
