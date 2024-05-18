import React from "react"
import "./quizResults.scss"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"

const QuizResults = ({ responseData }) => {
  const user = useAuth()

  console.log(responseData)
  //response data je array, svaki element ima isCorrect
  // izvuci lessonId iz jednog i isCorrect iz svih

  const results = responseData.map((response) => response.isCorrect)
  if (!results.includes(false)) {
    console.log("All correct")
    const handleLessonLearned = async () => {
      try {
        const response = await axios.put(
          "http://localhost:5500/api/profile/update",
          {
            userId: user.userId,
            completedLesson: responseData[0].lessonId,
          },
          {
            withCredentials: true,
          }
        )
        //update local storage
        localStorage.setItem("user", JSON.stringify(response.data))
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    handleLessonLearned()
  }

  return (
    <div className='answersContainer'>
      <h1>Your responses</h1>
      {responseData &&
        responseData.map((response) => (
          <div className='answeredQuestion'>
            <p className='questionTitle'>{response.questionText}</p>
            <p className={`${response.isCorrect ? "correct" : "incorrect"}`}>
              {response.selectedAnswer}
            </p>
            <p>This is the correct answer!</p>
            {!response.isCorrect && (
              <p className='correct'>{response.correctAnswer}</p>
            )}
          </div>
        ))}
    </div>
  )
}

export default QuizResults
