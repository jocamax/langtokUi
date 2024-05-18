import React from "react"
import "./singleLecture.scss"
import { Badge } from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { useState, useEffect, useRef } from "react"
import TakeQuizCard from "../../components/takeQuizCard/TakeQuizCard"
import axios from "axios"
import { useParams } from "react-router-dom"
import Quiz from "../lectureQuiz/LectureQuiz"
import { Link } from "react-router-dom"
import { MdOutlineQuiz } from "react-icons/md"

const SingleLesson = () => {
  const [singleLesson, setSingleLesson] = useState([])
  const [loading, setLoading] = useState()
  const [slides, setSlides] = useState([])
  const carouselRef = useRef()

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    try {
      const fetchSingleLesson = async () => {
        const response = await axios.get(
          `http://localhost:5500/api/lectures/${id}`,
          {
            withCredentials: true,
          }
        )

        setSingleLesson(response.data)
        setLoading(false)
        console.log(response.data)
      }
      fetchSingleLesson()
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='singleLectureContainer'>
      <div className='singleLectureWrapper'>
        <div className='singleLectureTopBar'>
          <div>
            <h1>{singleLesson.lessonTitle}</h1>
            <Badge size='sm' color='blue' mr={"10"} variant='light'>
              {singleLesson.level}
            </Badge>
            <Badge size='sm' color='blue' variant='light'>
              Grammar
            </Badge>
          </div>
          <>
            <Link
              to={{ pathname: "/quiz" }}
              state={{
                lessonId: singleLesson._id,
                lessonQuiz: singleLesson.lessonQuestions,
              }}
              className='topBarQuizBtn'
            >
              <MdOutlineQuiz className='quizIcon' size={30} />
              <p>Let's do a Quiz!</p>
            </Link>
          </>
        </div>
        <div className='lectureContent'>
          <div
            dangerouslySetInnerHTML={{ __html: singleLesson.lessonContent }}
          />

          {/* <TakeQuizCard /> */}
          <div className='takeQuizContainer'>
            <Link
              to={{ pathname: "/quiz" }}
              state={{
                lessonId: singleLesson._id,
                lessonQuiz: singleLesson.lessonQuestions,
              }}
              className='quizButton'
            >
              <MdOutlineQuiz className='quizIcon' size={70} />
              <p>Test your knowledge!</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleLesson
