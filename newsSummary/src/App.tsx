import { useState } from 'react'
import './App.css'
import HomePage from './Components/HomePage'
import NewsSection from './Components/NewsSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HomePage/>
    <NewsSection/>
    </>
  )
}

export default App
