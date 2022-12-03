const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_DIR = 'ADD_DIR'
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_VIEW = 'SET_VIEW'

const initialState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  view: 'list',
}

export const filesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_FILES:
      return {...state, files: payload}
    case SET_CURRENT_DIR:
      return {...state, currentDir: payload}
    case ADD_DIR:
      return {...state, files: [...state.files, payload]}
    case SET_POPUP_DISPLAY:
      return {...state, popupDisplay: payload}
    case PUSH_TO_STACK:
      return {...state, dirStack: [...state.dirStack, payload]}
    case DELETE_FILE:
      return {...state, files: [...state.files.filter(file => file._id !== payload)]}
    case SET_VIEW:
      return {...state, view: payload}

    default:
      return state
  }
}

export const setFiles = files => ({type: SET_FILES, payload: files})

export const setCurrentDir = dir => ({type: SET_CURRENT_DIR, payload: dir})

export const addDir = dir => ({type: ADD_DIR, payload: dir})

export const setPopupDisplay = display => ({type: SET_POPUP_DISPLAY, payload: display})

export const pushToStack = dir => ({type: PUSH_TO_STACK, payload: dir})

export const deleteFileAction = dirId => ({type: DELETE_FILE, payload: dirId})

export const setFileView = payload => ({type: SET_VIEW, payload})
