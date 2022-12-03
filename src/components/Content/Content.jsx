import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, Route, Routes} from 'react-router-dom'
import {auth} from '../../actions/userAction'
import './Content.scss'
import Disk from '../Disk/Disk'
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import Profile from '../Profile/Profile'


const Content = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  })

  return (
    <div className="content">
      {!isAuth ? (
        <Routes>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Disk/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      )}
    </div>
  )
}

export default Content
