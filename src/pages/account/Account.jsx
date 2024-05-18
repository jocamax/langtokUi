import React from "react"
import "./account.scss"
import { useAuth } from "@clerk/clerk-react"

const Account = () => {
  const user = useAuth()
  console.log(user)
  return <div>Account</div>
}

export default Account
