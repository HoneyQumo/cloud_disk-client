import React from 'react'
import './Profile.scss'
import {useDispatch} from 'react-redux'
import {deleteAvatar, uploadAvatar} from '../../actions/userAction'


const Profile = () => {
  const dispatch = useDispatch()

  function handleChangeInput(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
  }

  return (
    <div>
      <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
      <input accept="image/*" type="file" placeholder="Загрузить аватар" onChange={(e) => handleChangeInput(e)}/>
    </div>
  )
}

export default Profile