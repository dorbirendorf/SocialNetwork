import React from 'react'
import {Link} from 'react-router-dom'

 const Navbar = () => {
    return (
        <nav class="navbar bg-dark">
        <h1>
          <Link to="/index"/><i class="fas fa-code"></i> DevConnector
        </h1>
        <ul>
          <li><Link to="/profiles">Developers </Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    )
}
export default Navbar
