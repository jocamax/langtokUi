import React from "react"
import "./lectureQuiz.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import QuizResults from "../../components/quizResults/QuizResults"
import { IoIosArrowBack } from "react-icons/io"
import { useLocation } from "react-router-dom"

const LectureQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correct, setCorrect] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [responseData, setResponseData] = useState([])

  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  console.log(location.state.lessonQuiz)

  const questions = location.state.lessonQuiz
  const lessonId = location.state.lessonId
  console.log(questions)

  const handleResponse = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer
    setSelectedAnswer(selectedAnswer)

    const responseQuestionData = {
      id: questions[currentQuestion]._id,
      questionText: questions[currentQuestion].question,
      selectedAnswer,
      isCorrect: isCorrect,
      correctAnswer: questions[currentQuestion].correctAnswer,
      lessonId: lessonId,
    }

    setResponseData([...responseData, responseQuestionData])

    if (isCorrect) {
      setCorrect("correct")
    } else {
      setCorrect("incorrect")
    }

    // Wait for 400ms before moving to the next question
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setCorrect("")
    }, 400)
  }

  return (
    <div className='quizContainer'>
      {currentQuestion >= questions.length ? (
        <QuizResults responseData={responseData} />
      ) : (
        <>
          <div className='header'>
            <h4>Quiz</h4>
          </div>
          <div className='middleWrapper'>
            <div className='questionNumber'>
              <p>
                {currentQuestion + 1}/{questions.length} Questions
              </p>
            </div>
            <div className='question'>
              <p className='questionTitle'>
                {questions[currentQuestion].question}
              </p>
              <div className='options'>
                {questions[currentQuestion].answers.map((answer, index) => (
                  <p
                    key={index}
                    className={
                      selectedAnswer === answer
                        ? answer === questions[currentQuestion].correctAnswer
                          ? "correct"
                          : "incorrect"
                        : ""
                    }
                    onClick={() => handleResponse(answer)}
                  >
                    {answer}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className='footer'>
            <IoIosArrowBack className='backIcon' onClick={() => navigate(-1)} />
          </div>
        </>
      )}
    </div>
  )
}

export default LectureQuiz
