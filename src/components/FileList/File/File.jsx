import React from 'react'
import './File.scss'
import dir__image from '../../../assets/img/dir__image.svg'
import file__image from '../../../assets/img/file__image.svg'
import file__delete from '../../../assets/img/fileDelete__image.svg'
import file__download from '../../../assets/img/fileDownload__image.png'

import {useDispatch, useSelector} from 'react-redux'
import {pushToStack, setCurrentDir} from '../../../reducers/filesReducer'
import {deleteFile, downloadFile} from '../../../actions/fileAction'
import sizeFormat from '../../../utils/sizeFormat.js'


const File = ({file}) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const filesView = useSelector(state => state.files.view)


  const openDirHandler = file => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(e) {
    e.stopPropagation()
    dispatch(deleteFile(file))
  }

  if (filesView === 'plate') {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <div className="file-plate__img">
          <img src={file.type === 'dir' ? dir__image : file__image} alt=""/>
        </div>
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__size">{sizeFormat(file.size)}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <div
              className="file-plate__btn file-plate__download"
              onClick={e => downloadClickHandler(e)}
            >
              <img src={file__download} alt="Download"/>
            </div>
          )}
          <div onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">
            <img src={file__delete} alt="Delete"/>
          </div>
        </div>
      </div>
    )
  }

  if (filesView === 'list') {
    return (
      <div className="file-list" onClick={() => openDirHandler(file)}>
        <div className="file__img">
          <img src={file.type === 'dir' ? dir__image : file__image} alt=""/>
        </div>
        <div className="file-list__name">{file.name}</div>
        <div className="file-list__date">
          {file.date.slice(0, 10).split('-').reverse().join('-')}
        </div>
        <div className="file-list__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && (
          <button
            className="file-list__btn file-list__download"
            onClick={e => downloadClickHandler(e)}
          >
            <img src={file__download} alt="Download"/>
          </button>
        )}
        <button onClick={(e) => deleteClickHandler(e)} className="file-list__btn file-list__delete">
          <img src={file__delete} alt="Delete"/>
        </button>
      </div>
    )
  }
}

export default File
