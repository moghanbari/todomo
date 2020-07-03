import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <section className="footer-container">
        <div className="two-column-wrapper">
          <div className="col1">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
              sint possimus alias rerum quod! Enim nobis amet tempore cumque
              ratione ipsam, provident dignissimos ex unde totam numquam.
              Voluptas, consequuntur odio?
            </p>
          </div>
          <div className="col2">
            <ul className="footer-external-links">
              <li>
                <a href="http://github.com" className="no-decoration">
                  About
                </a>
              </li>
              <li>
                <a href="http://github.com" className="no-decoration">
                  Github Repo
                </a>
              </li>
              <li>
                <a href="http://github.com" className="no-decoration">
                  Who Am I
                </a>
              </li>
              <li>
                <a href="http://github.com" className="no-decoration">
                  Contact Me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
