import React from 'react'
import "/Users/jenishmanandhar/djangoapi/my-app/src/Home.css"
const Index = () => {
  return (
    <div className="App">
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/signup">SignUp</a></li>
      </ul>
    </nav>
    <div className="content">

      <h1>Welcome</h1>
    </div>
  </div>
  )
}

export default Index