import React, { useState } from "react"
import axios from "axios"
import "./addLecture.scss"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css" // for snow theme
import { Protect } from "@clerk/clerk-react"
import fetch from "isomorphic-fetch"
import { useAuth } from "@clerk/clerk-react"

const AddLecture = () => {
  const { getToken } = useAuth()

  const [formData, setFormData] = useState({
    lessonTitle: "",
    lessonContent: "",
    targetLanguage: "Hungarian", // Assuming a default value, can be changed
    displayLanguage: "English", // Assuming a default value, can be changed
    level: "",
    chapter: "",
    lessonOrder: "",
    lessonQuestions: [
      {
        question: "",
        answers: ["", "", ""],
        correctAnswer: "",
      },
    ],
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Update for handling React Quill content
  const handleQuillChange = (value) => {
    setFormData({ ...formData, lessonContent: value })
  }

  const handleQuestionChange = (e, index) => {
    const updatedQuestions = [...formData.lessonQuestions]
    updatedQuestions[index][e.target.name] = e.target.value
    setFormData({ ...formData, lessonQuestions: updatedQuestions })
  }

  const handleAnswersChange = (e, questionIndex, answerIndex) => {
    const updatedQuestions = [...formData.lessonQuestions]
    updatedQuestions[questionIndex].answers[answerIndex] = e.target.value
    setFormData({ ...formData, lessonQuestions: updatedQuestions })
  }

  const addQuestion = () => {
    const newQuestion = {
      question: "",
      answers: ["", "", ""],
      correctAnswer: "",
    }
    setFormData({
      ...formData,
      lessonQuestions: [...formData.lessonQuestions, newQuestion],
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5500/api/lectures/",
  //       formData,
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     console.log(response.data)
  //     // make formData empty
  //     setFormData({
  //       lectureTitle: "",
  //       lectureContent: "",
  //       targetLanguage: "Hungarian", // Assuming a default value, can be changed
  //       displayLanguage: "English", // Assuming a default value, can be changed
  //       level: "",
  //       chapter: "",
  //       lessonOrder: "",
  //       lessonQuestions: [
  //         {
  //           question: "",
  //           answers: ["", "", ""],
  //           correctAnswer: "",
  //         },
  //       ],
  //     })
  //     // Handle success, e.g., clear form, show message
  //   } catch (error) {
  //     console.error(error)
  //     // Handle error, e.g., show error message
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await getToken()
      // Assuming formData is already defined in your component's state
      const response = await fetch("http://localhost:5500/api/lectures/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        // If the response is not 2xx, it is considered an error
        throw new Error(
          `Network response was not ok, status: ${response.status}`
        )
      }

      const responseData = await response.json()
      console.log(responseData)

      // Reset formData state to initial values after successful form submission
      setFormData({
        lessonTitle: "",
        lessonContent: "",
        targetLanguage: "Hungarian", // Example default value
        displayLanguage: "English", // Example default value
        level: "",
        chapter: "",
        lessonOrder: "",
        lessonQuestions: [
          {
            question: "",
            answers: ["", "", ""],
            correctAnswer: "",
          },
        ],
      })

      // Optionally, include any success handling logic here, e.g., showing a success message to the user
    } catch (error) {
      console.error(error)
      // Optionally, include any error handling logic here, e.g., showing an error message to the user
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ color: [] }, { background: [] }], // dropdown with defaults
      [{ font: [] }],
      [{ align: [] }],
      ["clean"], // remove formatting button
      ["link", "image", "video"], // link and image, video
    ],
  }

  // if (!canManage) {
  //   return <p>Only admin can post here</p>
  // }

  return (
    <Protect
      condition={(has) =>
        has({ role: "langtok:admin" }) || has({ role: "org:admin" })
      }
      fallback={<p>Only admin can post here</p>}
    >
      <form onSubmit={handleSubmit} className='addLecture'>
        <input
          name='lessonTitle'
          value={formData.lessonTitle}
          onChange={handleChange}
          placeholder='Lecture Title'
        />
        <ReactQuill
          className='quill'
          theme='snow'
          value={formData.lessonContent}
          onChange={handleQuillChange}
          modules={modules}
        />
        <input
          name='level'
          value={formData.level}
          onChange={handleChange}
          placeholder='Level'
        />
        <input
          name='chapter'
          type='number'
          value={formData.chapter}
          onChange={handleChange}
          placeholder='Chapter'
        />
        <input
          name='lessonOrder'
          type='number'
          value={formData.lessonOrder}
          onChange={handleChange}
          placeholder='Lesson Order'
        />

        {formData.lessonQuestions.map((question, index) => (
          <div key={index}>
            <input
              name='question'
              value={question.question}
              onChange={(e) => handleQuestionChange(e, index)}
              placeholder='Question'
            />
            {question.answers.map((answer, answerIndex) => (
              <input
                key={answerIndex}
                value={answer}
                onChange={(e) => handleAnswersChange(e, index, answerIndex)}
                placeholder={`Answer ${answerIndex + 1}`}
              />
            ))}
            <input
              name='correctAnswer'
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(e, index)}
              placeholder='Correct Answer'
            />
          </div>
        ))}
        <button type='button' onClick={addQuestion}>
          Add Question
        </button>
        <button type='submit'>Submit</button>
      </form>
    </Protect>
  )
}

export default AddLecture
