import React from 'react'
import './Disk.scss'
import fileUpload__image from '../../assets/img/fileUpload__image.png'
import fileList__image from '../../assets/img/fileList__image.svg'
import filePlate__image from '../../assets/img/filePlate__image.svg'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {getFiles, uploadFile} from '../../actions/fileAction'
import FileList from '../FileList/FileList'
import Popup from './Popup/Popup'
import {setCurrentDir, setFileView, setPopupDisplay} from '../../reducers/filesReducer'
import Uploader from './Uplodaer/Uploader'


const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const loader = useSelector(state => state.app.loader)
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [dispatch, currentDir, sort])

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  const fileUploadHandler = event => {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()

    setDragEnter(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  function dropHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    console.log(files)
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    setDragEnter(false)
  }

  if (loader === true) {
    return (
      <div className="loader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            {/* Загрузить файл */}
            <img src={fileUpload__image} alt="fileUpload"/>
          </label>
          <input
            multiple={true}
            onChange={event => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="disk__select">
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
        </select>
        <div className="disk__plate" onClick={() => dispatch(setFileView('plate'))}>
          <img src={filePlate__image} alt="плиткой"/>
        </div>
        <div className="disk__list" onClick={() => dispatch(setFileView('list'))}>
          <img src={fileList__image} alt="списком"/>
        </div>
      </div>
      <FileList/>
      <Popup/>
      <Uploader/>
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  )
}

export default Disk
