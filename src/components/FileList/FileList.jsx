import React from 'react'
import {useSelector} from 'react-redux'
import File from './File/File'

import './FileList.scss'


const FileList = () => {
  const files = useSelector(state => state.files.files).map(
    file => (<File key={file._id} file={file}/>),
  )

  const filesView = useSelector(state => state.files.view)

  if (filesView === 'plate') {
    return (
      <div className="filePlate">
        {files.length === 0 ? (
          <div className="filePlate__empty">
            <h2 className="filePlate__empty-title">
              Файлов нет :(
            </h2>
          </div>
        ) : (
          files
        )}
      </div>
    )
  }

  if (filesView === 'list') {
    return (
      <div className="fileList">
        <div className="fileList__header">
          <div className="fileList__name">Название</div>
          <div className="fileList__date">Дата</div>
          <div className="fileList__size">Размер</div>
        </div>
        {files.length === 0 ? (
          <div className="fileList__empty">
            <h2 className="fileList__empty-title">
              А где файлы? :((
            </h2>
          </div>
        ) : (
          files
        )}
      </div>
    )
  }
}

export default FileList
