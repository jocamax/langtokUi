import React from "react"
import { Link, NavLink } from "react-router-dom"
import { MdPublic, MdAccountCircle } from "react-icons/md"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { Burger } from "@mantine/core"
import "./navBar.scss"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

const NavBar = () => {
  const [opened, { toggle }] = useDisclosure()
  return (
    <div className='navBarContainer'>
      <div className='left'>
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label='Toggle navigation'
          color='lightGray'
        />{" "}
      </div>
      <div className='center'>
        <img className='huIcon' src='/huCircle.png' alt='' />
        <h1>Hungarian</h1>
      </div>
      <div className='right'>
        <NavLink
          exact='true'
          to='/account'
          className='navItem'
          activeclassname='activeNavItem navItem'
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <MdAccountCircle />
          </SignedOut>
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
