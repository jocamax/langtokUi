import React from "react"
import "./takeQuizCard.scss"
import { MdOutlineQuiz } from "react-icons/md"
import { Link } from "react-router-dom"

const TakeQuizCard = () => {
  return (
    <div className='takeQuizContainer'>
      <h2>Do the quiz for Lesson 3</h2>
      <Link to={"/quiz"} className='quizButton'>
        <MdOutlineQuiz className='quizIcon' size={70} />
        <p>Test your knowledge!</p>
      </Link>
    </div>
  )
}

export default TakeQuizCard
