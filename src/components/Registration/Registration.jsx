import React from 'react'
import {useState} from 'react'
import Button from '../../UI/Button/Button'
import FloatingInput from '../../UI/FloatingInput/FloatingInput'
import {registration} from '../../actions/userAction'
import './Registration.scss'


const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmitForm = (e) => {
    e.preventDefault()
    registration(email, password)
  }

  return (
    <form className="registration" onSubmit={handleSubmitForm}>
      <h2 className="registration__title">Регистрация</h2>
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
      <Button onClick={() => registration(email, password)} text="Отправить"/>
    </form>
  )
}

export default Registration
