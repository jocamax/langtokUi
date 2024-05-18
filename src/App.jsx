import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import SingleLecture from "./pages/singleLecture/SingleLecture"
import Home from "./pages/home/Home"
import Account from "./pages/account/Account"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import Navbar from "./components/navbar/Navbar"
import NavbarMobile from "./components/navbarMobile/NavbarMobile"
import Practice from "./pages/practice/Practice"
import LectureQuiz from "./pages/lectureQuiz/LectureQuiz"
import Quiz from "./pages/quiz/Quiz"
import "./app.scss"
import AddLesson from "./pages/addLecture/AddLesson"
import { createContext } from "react"
import SingleStory from "./pages/singleStory/SingleStory"

export const LessonQuizContext = createContext([])

function App() {
  const Layout = () => {
    return (
      <div className='app'>
        <Navbar />
        <Outlet />
        <NavbarMobile />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/lecture/:id",
          element: <SingleLecture />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/practice",
          element: <Practice />,
        },
        {
          path: "/addLecture",
          element: <AddLesson />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/quiz",
      element: <LectureQuiz />,
    },
    {
      path: "/normalQuiz", //ovo promeni
      element: <Quiz />,
    },
    {
      path: "/shortStory/:id",
      element: <SingleStory />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
