import React from 'react'
import './App.scss'
import Navbar from '../Navbar/Navbar'
import {BrowserRouter} from 'react-router-dom'
import Content from '../Content/Content'


const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Content/>
    </BrowserRouter>
  )
}

export default App
