import React, {useState} from 'react'
import Button from '../../UI/Button/Button'
import FloatingInput from '../../UI/FloatingInput/FloatingInput'
import {useDispatch} from 'react-redux'
import {login} from '../../actions/userAction'
import './Login.scss'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmitForm = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <form className="login" onSubmit={handleSubmitForm}>
      <h2 className="login__title">Авторизация</h2>
      <FloatingInput
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        name="email"
        title="E-mail"
      />
      <FloatingInput
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        name="password"
        title="Password"
      />
      <Button onClick={() => dispatch(login(email, password))} text="Войти"/>
    </form>
  )
}

export default Login
