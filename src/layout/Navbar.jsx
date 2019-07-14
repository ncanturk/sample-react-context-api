import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

const Navbar = ({title}) => {
  return(
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container active">
        <NavLink to = "/" className="navbar-brand">{title}</NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"> 
            <li className="nav-item">
              <NavLink exact={true} to = "/" className="nav-link" activeClassName='active'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to = "/add" className="nav-link" activeClassName='active'>Add User</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink to = "/404" className="nav-link" activeClassName='active'>404</NavLink> 
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  title : PropTypes.string.isRequired
}
Navbar.defaultProps = {
  title : "Default App"
}

export default Navbar;