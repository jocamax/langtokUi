import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import "./home.scss"
import LectureCard from "../../components/lectureCard/LectureCard"
import { Carousel } from "@mantine/carousel"
import { RingProgress } from "@mantine/core"
import axios from "axios"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react"
import { useAuth } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { OrganizationSwitcher } from "@clerk/clerk-react"

const Home = () => {
  const user = useAuth()
  //console.log(user)
  const [sortChapter, setSortChapter] = useState(1)
  const [sortLevel, setSortLevel] = useState("A1")
  const [status, setStatus] = useState("")
  const [data, setData] = useState([])
  const [ssStatus, setSSStatus] = useState("")
  const [ssData, setSSData] = useState([])

  const [filteredData, setFilteredData] = useState([])
  const [ssFilteredData, setSSFilteredData] = useState([])

  const fetchData = async () => {
    setStatus("loading")
    try {
      const response = await axios.get(`http://localhost:5500/api/lectures/`, {
        withCredentials: true,
      })
      setData(response.data)
      setStatus("success")
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchShortStories = async () => {
    setSSStatus("loading")
    try {
      const response = await axios.get(
        `http://localhost:5500/api/shortStories`,
        {
          withCredentials: true,
        }
      )
      setSSData(response.data)
      setStatus("success")
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const initiateUser = async () => {
    //http://localhost:5500/api/profile post user data (id and email  )
    try {
      const response = await axios.post(
        "http://localhost:5500/api/profile",
        {
          userId: user.userId,
        },
        {
          withCredentials: true,
        }
      )
      localStorage.setItem("user", JSON.stringify(response.data))
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initiateUser()
  }, [])

  // update filtered data every time sortChapter changes
  useEffect(() => {
    console.log(sortChapter)
    if (sortChapter === "All Chapters") {
      setFilteredData(data)
      setSSFilteredData(ssData)
    } else {
      const filtered = data
        .filter((lecture) => {
          return lecture.chapter === sortChapter
        })
        .sort((a, b) => a.lessonOrder - b.lessonOrder)

      const ssFiltered = ssData
        .filter((ss) => {
          return ss.chapter === sortChapter
        })
        .sort((a, b) => a.lessonOrder - b.lessonOrder)
      setFilteredData(filtered)
      setSSFilteredData(ssFiltered)
    }
  }, [sortChapter, data])

  useEffect(() => {
    fetchData()
    fetchShortStories()
  }, [])

  //handleSignOut just clears user data from local storage
  const handleSignOut = () => {
    localStorage.removeItem("user")
  }

  return (
    <div className='homeContainer'>
      <div className='contentWrapper'>
        <SignedOut>
          <SignInButton className='btn' />
        </SignedOut>
        <SignedIn>
          <SignOutButton className='btn' onClick={handleSignOut} />
          <OrganizationSwitcher />
        </SignedIn>
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
        <div className='lecturesContainer'>
          <div className='chapter1'>
            <div className='chapterInfo'>
              <div>
                <h2>Chapter {sortChapter}</h2>
              </div>

              <div>
                <button>Quiz</button>
              </div>
            </div>
            <div className='lectures'>
              {/* <LectureCard /> */}
              <div className='miniStats'>
                <h4>Grammar</h4>
                <p>See All</p>
              </div>
              <Carousel
                height={"auto"}
                slideSize={"auto"}
                slideGap='md'
                mb={16}
                align='start'
                slidesToScroll={2}
                dragFree
                classNames={{ control: "carouselControl" }}
              >
                {filteredData.map((lesson) => {
                  return (
                    <Carousel.Slide key={lesson._id}>
                      <LectureCard
                        lessonTitle={lesson.lessonTitle}
                        lessonId={lesson._id}
                      />
                    </Carousel.Slide>
                  )
                })}
              </Carousel>
              <h4>Short Stories</h4>
              <Carousel
                height={"auto"}
                slideSize={"auto"}
                slideGap='md'
                align='start'
                slidesToScroll={2}
                dragFree
                classNames={{ control: "carouselControl" }}
              >
                {ssFilteredData.map((lesson) => {
                  return (
                    <Carousel.Slide key={lesson._id}>
                      <LectureCard
                        lessonTitle={lesson.lessonTitle}
                        lessonId={lesson._id}
                        isStory={true}
                      />
                    </Carousel.Slide>
                  )
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
