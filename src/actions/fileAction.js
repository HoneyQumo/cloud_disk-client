import axios from 'axios'
import {addDir, deleteFileAction, setFiles} from '../reducers/filesReducer'
import {addUploaderFile, changeUploadFile, showUploader} from '../reducers/uploadReducer'
import {hideLoader, showLoader} from '../reducers/appReducer'
import {API_URL} from '../config'


export const getFiles = (dirId, sort) => async dispatch => {
  try {
    dispatch(showLoader())
    let url = `${API_URL}/api/files`
    if (dirId) url = `${API_URL}/api/files?parent=${dirId}`
    if (sort) url = `${API_URL}/api/files?sort=${sort}`
    if (dirId && sort) url = `${API_URL}/api/files?parent=${dirId}&sort=${sort}`
    const response = await axios.get(
      url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      },
    )
    dispatch(setFiles(response.data))
  } catch (e) {
    alert(e.response.data.message)
  } finally {
    dispatch(hideLoader())
  }
}

export const createDir = (dirId, name) => async dispatch => {
  try {
    const response = await axios.post(
      `${API_URL}/api/files`,
      {
        name,
        parent: dirId,
        type: 'dir',
      },
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      },
    )
    dispatch(addDir(response.data))
    console.log(response.data)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const uploadFile = (file, dirId) => async dispatch => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    if (dirId) {
      formData.append('parent', dirId)
    }

    const uploadFile = {id: Date.now(), name: file.name, progress: 0}
    dispatch(showUploader())
    dispatch(addUploaderFile(uploadFile))

    const response = await axios.post(
      `${API_URL}/api/files/upload`,
      formData,
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
            progressEvent.target.getResponseHeader(
              'x-decompressed-content-length',
            )
          console.log('total', totalLength)
          if (totalLength) {
            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
            dispatch(changeUploadFile(uploadFile))
          }
        },
      },
    )
    dispatch(addDir(response.data))
    console.log(response.data)
  } catch (e) {
    alert(e?.response?.data?.message)
  }
}

export async function downloadFile(file) {
  const response = await fetch(
    `${API_URL}/api/files/download?id=${file._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export const deleteFile = (file) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/api/files?id=${file._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    dispatch(deleteFileAction(file._id))
    alert(response.data.message)
  } catch (e) {
    alert(e?.response?.data?.message)
  }
}

export const searchFiles = (search) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/files/search?search=${search}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    dispatch(setFiles(response.data))
  } catch (e) {
    alert(e?.response?.data?.message)
  } finally {
    dispatch(hideLoader())
  }
}
