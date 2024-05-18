import React from "react"
import "./navBarMobile.scss"
import { MdPublic, MdAccountCircle } from "react-icons/md"
import { AiFillHome } from "react-icons/ai"
import { FaDumbbell } from "react-icons/fa6"

import { Link, NavLink } from "react-router-dom"
import { IoStatsChart } from "react-icons/io5"

const NavBarMobile = () => {
  return (
    <div className='navMobileContainer'>
      <div className='navItems'>
        <NavLink
          exact='true'
          to='/'
          className='navItem'
          activeclassname='activeNavItem navItem'
        >
          <AiFillHome className='navIcon' />
        </NavLink>

        <NavLink
          exact='true'
          to='/practice'
          className='navItem'
          activeclassname='activeNavItem navItem'
        >
          <FaDumbbell className='navIcon' />
        </NavLink>

        <NavLink
          exact='true'
          to='/account'
          className='navItem'
          activeclassname='activeNavItem navItem'
        >
          <IoStatsChart className='navIcon' />
        </NavLink>
      </div>
    </div>
  )
}

export default NavBarMobile
