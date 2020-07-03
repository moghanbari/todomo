import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main>
      <div className="not-found container mt-100 text-center">
        <h1 className="font-weight-200 mb-40">Page Not Found</h1>
        <p className="">Sorry, this page does not exist</p>
      </div>
      <div className="text-center mt-50">
        <Link className="button" to="/">
          Return to Homepage
        </Link>
      </div>
    </main>
  )
}

export default NotFound
