import React from "react"
import "./quiz.scss"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import QuizResults from "../../components/quizResults/QuizResults"
import { IoIosArrowBack } from "react-icons/io"
import { useLocation } from "react-router-dom"

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correct, setCorrect] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [responseData, setResponseData] = useState([])

  const [firstPair, setFirstPair] = useState()
  const [secondPair, setSecondPair] = useState()

  const [correctPairs, setCorrectPairs] = useState([])
  const [incorrectPairs, setIncorrectPairs] = useState([])

  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  console.log(location.state.quiz)

  const questions = location.state.quiz

  const lessonId = location.state.lessonId

  const handleResponse = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswerMC
    setSelectedAnswer(selectedAnswer)

    const responseQuestionData = {
      id: questions[currentQuestion]._id,
      questionText: questions[currentQuestion].questionText,
      selectedAnswer,
      isCorrect: isCorrect,
      correctAnswer: questions[currentQuestion].correctAnswerMC,
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

  // Connect the pairs logic

  const handleSelectItem = (item) => {
    if (correctPairs.includes(item) || incorrectPairs.includes(item)) return

    console.log(item)
    if (item.position === "top") {
      setFirstPair(item)
    }
    if (item.position === "bot") {
      setSecondPair(item)
    }
  }

  useEffect(() => {
    if (firstPair && secondPair) {
      if (firstPair.elementId === secondPair.pairId) {
        setCorrectPairs((prevPairs) => [...prevPairs, firstPair, secondPair])
        setFirstPair("")
        setSecondPair("")
        // ukoliko je poslednji render i bude sve tacno onda ubacujemo u backend id pitanja da smo tacno odgovorili
      } else {
        setIncorrectPairs((prevPairs) => [...prevPairs, firstPair, secondPair])
        setFirstPair("")
        setSecondPair("")
        // ako ima 2 incorrecta ili vise onda ce pitanje ici kao netacno
      }
    }
  }, [firstPair, secondPair])

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
              {questions[currentQuestion].questionType === "multipleChoice" && (
                <>
                  <p className='questionTitle'>
                    {questions[currentQuestion].questionText}
                  </p>
                  <div className='options'>
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <p
                        key={index}
                        className={
                          selectedAnswer === answer
                            ? answer ===
                              questions[currentQuestion].correctAnswerMC
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
                </>
              )}
            </div>
            {questions[currentQuestion].questionType === "connect" && (
              <div className='connectContainer'>
                <h3>Tap the pairs</h3>
                <div className='topPairs pairs'>
                  <span>English</span>
                  <div className='words'>
                    {questions[currentQuestion].pairs
                      .filter((item) => item.position === "top")
                      .map((item, index) => (
                        <p
                          key={item.elementId}
                          onClick={() => handleSelectItem(item)}
                          className={`
                          ${firstPair === item ? "selected" : ""} 
                          ${correctPairs.includes(item) ? "correct" : ""} 
                          ${incorrectPairs.includes(item) ? "incorrect" : ""}`}
                        >
                          {item.content}
                        </p>
                      ))}
                  </div>
                </div>
                <div className='bottomPairs pairs'>
                  <span>Hungarian</span>
                  <div className='words'>
                    {questions[currentQuestion].pairs
                      .filter((item) => item.position === "bot")
                      .map((item, index) => (
                        <p
                          key={item.elementId}
                          onClick={() => handleSelectItem(item)}
                          className={`
                          ${secondPair === item ? "selected" : ""} ${
                            correctPairs.includes(item) ? "correct" : ""
                          } 
                          ${incorrectPairs.includes(item) ? "incorrect" : ""}`}
                        >
                          {item.content}
                        </p>
                      ))}
                  </div>
                </div>
                <button
                  className='continueBtn'
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          <div className='footer'>
            <IoIosArrowBack className='backIcon' onClick={() => navigate(-1)} />
          </div>
        </>
      )}
    </div>
  )
}

export default Quiz
