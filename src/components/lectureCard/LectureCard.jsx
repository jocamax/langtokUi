import React, { useEffect, useState } from "react"
import "./lectureCard.scss"
import { FaHeart } from "react-icons/fa"
import { RiCheckboxCircleFill } from "react-icons/ri"
import { Badge } from "@mantine/core"
import { MdQuiz } from "react-icons/md"
import { Link } from "react-router-dom"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"

const LectureCard = (data) => {
  const [user2, setUser2] = useState([])
  const user = useAuth()
  const handleLessonLearned = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5500/api/profile/update",
        {
          userId: user.userId,
          completedLesson: data.lessonId,
        },
        {
          withCredentials: true,
        }
      )
      //update local storage
      localStorage.setItem("user", JSON.stringify(response.data))
      setUser2(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLessonUnlearned = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5500/api/profile/remove",
        {
          userId: user.userId,
          completedLesson: data.lessonId,
        },
        {
          withCredentials: true,
        }
      )
      //update local storage
      localStorage.setItem("user", JSON.stringify(response.data))
      setUser2(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/profile/${user.userId}`,
        {
          withCredentials: true,
        }
      )
      setUser2(response.data)
      localStorage.setItem("user", JSON.stringify(response.data))
      console.log("arrr0" + response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='lectureCardContainer'>
      {data.isStory ? (
        <Link to={`/shortStory/${data.lessonId}`} className='title'>
          <h3>{data.lessonTitle}</h3>
          <Badge size='sm' color='blue' mr={"10"} variant='light'>
            A1
          </Badge>
          <Badge size='sm' color='blue' variant='light'>
            Short Stort
          </Badge>
        </Link>
      ) : (
        <Link to={`/lecture/${data.lessonId}`} className='title'>
          <h3>{data.lessonTitle}</h3>
          <Badge size='sm' color='blue' mr={"10"} variant='light'>
            A1
          </Badge>
          <Badge size='sm' color='blue' variant='light'>
            Grammar
          </Badge>
        </Link>
      )}
      {/* <Link to={`/lecture/${data.lessonId}`} className='title'>
        <h3>{data.lessonTitle}</h3>
        <Badge size='sm' color='blue' mr={"10"} variant='light'>
          A1
        </Badge>
        <Badge size='sm' color='blue' variant='light'>
          Grammar
        </Badge>
      </Link> */}
      <div className='bottomButtons'>
        <SignedIn>
          {JSON.parse(localStorage.getItem("user")).completedLessons?.includes(
            data.lessonId
          ) ? (
            <RiCheckboxCircleFill
              className={`checkboxIcon 
                 ${
                   localStorage.getItem("user") &&
                   JSON.parse(
                     localStorage.getItem("user")
                   ).completedLessons?.includes(data.lessonId)
                     ? "completed"
                     : ""
                 }`}
              onClick={handleLessonUnlearned}
            />
          ) : (
            <RiCheckboxCircleFill
              className={`checkboxIcon 
              ${
                localStorage.getItem("user") &&
                JSON.parse(
                  localStorage.getItem("user")
                ).completedLessons?.includes(data.lessonId)
                  ? "completed"
                  : ""
              }`}
              onClick={handleLessonLearned}
            />
          )}
        </SignedIn>
        <SignedOut>
          <RiCheckboxCircleFill className='checkboxIcon' />
        </SignedOut>

        <div className='bottomRightButtons'>
          <MdQuiz className='quizIcon' />
          <FaHeart className='heartIcon' />
        </div>
      </div>
    </div>
  )
}

export default LectureCard
