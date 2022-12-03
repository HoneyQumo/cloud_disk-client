import React from 'react'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createDir} from '../../../actions/fileAction'
import {setPopupDisplay} from '../../../reducers/filesReducer'
import FloatingInput from '../../../UI/FloatingInput/FloatingInput'
import './Popup.scss'


const Popup = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector(state => state.files.popupDisplay)
  const currentDir = useSelector(state => state.files.currentDir)
  const dispatch = useDispatch()

  const createHandler = () => {
    dispatch(createDir(currentDir, dirName))
    setDirName('')
    dispatch(setPopupDisplay('none'))
  }

  return (
    <div
      className="popup"
      onClick={() => dispatch(setPopupDisplay('none'))}
      style={{display: popupDisplay}}
    >
      <div className="popup__content" onClick={e => e.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Новая папка</div>
          <button
            className="popup__close"
            onClick={() => dispatch(setPopupDisplay('none'))}
          >
            ✖
          </button>
        </div>
        <FloatingInput
          type="text"
          name="popup"
          title="Введите название"
          value={dirName}
          onChange={e => setDirName(e.target.value)}
        />
        <button className="popup__create" onClick={() => createHandler()}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Popup
