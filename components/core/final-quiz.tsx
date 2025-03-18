'use client'
import React, { useState } from 'react'

const FinalQuiz = ({ subject, aiScore }: { subject: string; aiScore: number }) => {
  const [finalScore, setFinalScore] = useState(0)
  const [passed, setPassed] = useState<boolean | null>(null)

  const handleFinalSubmit = () => {
    const score = Math.floor(Math.random() * 21)
    setFinalScore(score)
    const passStatus = score >= 10
    setPassed(passStatus)
    alert(`You scored ${score}/20. ${passStatus ? 'You Passed! 🎉' : 'You Failed. 😔'}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Final Exam on {subject}</h2>
      <p>Your AI Quiz Score: {aiScore}/10</p>
      <p>Answer the 20 final exam questions to complete the course.</p>
      <button className="mt-4 px-4 py-2 rounded-lg hover:bg-muted" onClick={handleFinalSubmit}>
        Submit Final Exam
      </button>
      
      {passed !== null && (
        <div className="mt-6">
          {passed ? (
            <p className="text-green-600 font-bold">Congratulations! You passed the exam! 🎉</p>
          ) : (
            <p className="text-red-600 font-bold">Sorry, you didn't pass. Try again! 😔</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FinalQuiz
