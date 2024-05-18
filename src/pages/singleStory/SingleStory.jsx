import React from "react"
import "./singleStory.scss"
import { Badge } from "@mantine/core"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Spoiler, Popover } from "@mantine/core"
import { Link } from "react-router-dom"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/src/styles.scss"

const SingleStory = () => {
  const [singleStory, setSingleStory] = useState([])
  const [loading, setLoading] = useState()
  const [sentances, setSentances] = useState([])
  const [translatedSentances, setTranslatedSentances] = useState([])

  const { id } = useParams()

  //convert singleStory.storyTl to array of sentances to be able to map through it. Sentance can end with . or ! or ?

  useEffect(() => {
    setLoading(true)
    try {
      const fetchSingleStory = async () => {
        const response = await axios.get(
          `http://localhost:5500/api/shortStories/${id}`,
          {
            withCredentials: true,
          }
        )

        setSingleStory(response.data)
        setSentances(response.data.storyTl.split(/(?<=[.!?])/))
        setTranslatedSentances(
          response.data.storyTranslated.split(/(?<=[.!?])/)
        )
        console.log(sentances)
        setLoading(false)
        console.log(response.data)
      }
      fetchSingleStory()
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='singleLectureContainer' key={singleStory.lessonId}>
      <div className='singleLectureWrapper'>
        <div className='singleLectureTitle'>
          <div className=''>
            <h1>{singleStory.lessonTitle}</h1>
            <Badge size='sm' color='blue' mr={"10"} variant='light'>
              {singleStory.level}
            </Badge>
            <Badge size='sm' color='blue' variant='light'>
              Short Story
            </Badge>
          </div>
          <div className=''>
            <Link className='btn'>Short Story Quiz</Link>
          </div>
        </div>
        <div className='shortStory'>
          {sentances.map((sentance, index) => {
            return (
              <Popover width={200} position='bottom' withArrow shadow='md'>
                <Popover.Target key={index}>
                  <span className='popoverBtn'>{sentance}</span>
                </Popover.Target>
                <Popover.Dropdown bg={"#3e4252"} c={"white"}>
                  <p size='xs'>{translatedSentances[index]}</p>
                </Popover.Dropdown>
              </Popover>
            )
          })}
        </div>
        <div className='translatedStory'>
          <h3>Translated Story</h3>
          <Spoiler maxHeight={0} showLabel='Show translation' hideLabel='Hide'>
            <p>{singleStory.storyTranslated}</p>
          </Spoiler>
        </div>
      </div>
      <div className='audioDiv'>
        <AudioPlayer
          className='audioPlayer'
          src='https://dl.dropbox.com/scl/fi/91me7qcpabh1myaz4gz1w/download.mp3?rlkey=sgkkulyfaichcqca0k9uxy722'
          onPlay={(e) => console.log("onPlay")}
        />
      </div>

      {/* <audio controls>
        <source
          src='https://dl.dropbox.com/scl/fi/91me7qcpabh1myaz4gz1w/download.mp3?rlkey=sgkkulyfaichcqca0k9uxy722'
          type='audio/mpeg'
        />
        Your browser does not support the audio element.
      </audio> */}
    </div>
  )
}

export default SingleStory
