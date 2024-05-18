import React, { useState } from "react"
import { FaQuestionCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import "./practice.scss"

const Practice = () => {
  const [sortChapter, setSortChapter] = useState(1)
  const [sortLevel, setSortLevel] = useState("A1")
  const [sortNumberOfQuestions, setSortNumberOfQuestions] = useState(10)
  const [questions, setQuestions] = useState([])
  const navigate = useNavigate()

  const goToQuiz = async (category) => {
    try {
      // dodaj params posle za sad neka se default parametri pokazu i tjt
      const response = await axios.get(`http://localhost:5500/api/questions`, {
        withCredentials: true,
      })
      setQuestions(response.data)
      console.log(questions)

      navigate("/normalQuiz", { state: { quiz: response.data } })
    } catch (error) {
      console.log("failed to fetch data", error)
    }
  }

  return (
    <div className='practiceWrapper'>
      <div className='practiceContainer'>
        <div className='sortByContainer'>
          <div className='sortByOption'>
            <span>Level:</span>
            <select
              id='sortLevel'
              value={sortLevel}
              onChange={(e) => setSortLevel(e.target.value)}
            >
              <option value='A1'>A1</option>
              <option value='A2'>A2</option>
              <option value='B1'>B1</option>
              <option value='B2'>B2</option>
            </select>
          </div>
          <div className='sortByOption'>
            <span>Chapter:</span>
            <select
              id='sortChapter'
              value={sortChapter}
              onChange={(e) => {
                const value = e.target.value
                setSortChapter(value === "All Chapters" ? value : Number(value))
              }}
            >
              <option value={1}>Chapter 1</option>
              <option value={2}>Chapter 2</option>
              <option value={3}>Chapter 3</option>
              <option value={4}>Chapter 4</option>
              <option value={5}>Chapter 5</option>
              <option value={6}>Chapter 6</option>
              <option value={7}>Chapter 7</option>
              <option value='All Chapters'>All Chapters</option>
            </select>
          </div>
        </div>
        <div className='quizHeader'>
          <h2>Quiz</h2>
          <div className='sortByOption'>
            <span>Number of questions:</span>

            <select
              id='numberOfQuestions'
              value={sortNumberOfQuestions}
              onChange={(e) => {
                const value = e.target.value
                setSortNumberOfQuestions(Number(value))
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div className='quizTypes'>
          <button onClick={() => goToQuiz("nouns")} className='quizType'>
            <span>Nouns</span>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("cases")} className='quizType'>
            <p>Cases</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("verbs")} className='quizType'>
            <p>Verbs</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("vocab")} className='quizType'>
            <p>Vocabulary</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("adjectives")} className='quizType'>
            <p>Adjectives</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("synAnt")} className='quizType'>
            <p>Synonim, Antonym</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
          <button onClick={() => goToQuiz("")} className='quizType'>
            <p>All Questions</p>
            <FaQuestionCircle className='questionIcon' />
          </button>
        </div>
        <div className='previousResults'>
          <div className='previousResultsCard'>
            <h3>Quiz results</h3>
            <p>List of wrong answers</p>
            <p>See last 10 quiz results</p>
            <p>See quiz statistics</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Practice
