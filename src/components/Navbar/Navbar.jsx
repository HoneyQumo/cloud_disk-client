import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'

import './Navbar.scss'
import navbar__image from '../../assets/img/navbar__image.svg'
import navbar__avatar from '../../assets/img/navbar__avatar.svg'
import {logout} from '../../reducers/userReducer'
import FloatingInput from '../../UI/FloatingInput/FloatingInput'
import {getFiles, searchFiles} from '../../actions/fileAction'
import {showLoader} from '../../reducers/appReducer'
import {API_URL} from '../../config'


const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const currentDir = useSelector(state => state.files.currentDir)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)
  const avatar = currentUser.avatar ? `${API_URL + '/' + currentUser.avatar}` : navbar__avatar

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)

    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if (e.target.value !== '') {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value))
      }, 350, e.target.value))
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
    <div className="navbar ">
      <div className="navbar__wrapper">
        <div className="navbar__logo">
          <div className="navbar__image">
            <img src={navbar__image} alt="navbar logo"/>
          </div>
          <div className="navbar__title">CLOUD DISK</div>
        </div>

        {isAuth && (
          <div style={{marginBottom: '-38px', width: '50%'}}>
            <FloatingInput
              type="text"
              name="search"
              title="Поиск"
              value={searchName}
              onChange={e => handleSearchChange(e)}
            />
          </div>
        )}

        <div className="navbar__authorization">
          {!isAuth && (
            <div className="navbar__registration">
              <NavLink to="/registration">Регистрация</NavLink>
            </div>
          )}
          {!isAuth && (
            <div className="navbar__login">
              <NavLink to="/login">Войти</NavLink>
            </div>
          )}
          {isAuth && (
            <div onClick={() => dispatch(logout())} className="navbar__logout">
              Выйти
            </div>
          )}
          {isAuth && (
            <NavLink to="/profile" className="navbar__avatar">
              <img src={avatar} alt="аватар"/>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
