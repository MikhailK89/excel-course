import {defaultStyles} from '@/constants'
import {defaultTitle} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'Text'}
  stylesState: {}, // {'1': {styles}}
  currentText: '',
  currentStyles: defaultStyles,
  openDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
