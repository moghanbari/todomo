import React from 'react'
import backgroundImage from '../../assets/landing-background.jpg'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <section className="landing container mt-100">
      <div className="two-column-wrapper">
        <div className="col1">
          <div className="landing-image">
            <img src={backgroundImage} alt="" />
          </div>
        </div>
        <div className="col2">
          <h1>Todomo</h1>
          <h2>Make organizing your todos fun</h2>
          <p>
            This is a todo application done by React for fron-end technology and
            Node.js for backend. Basically it's a MERN Stack application. So
            obviously this app is not commercial. You can find the toturial
            here.
          </p>
          <Link className="button get-started" to="/register">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Landing
