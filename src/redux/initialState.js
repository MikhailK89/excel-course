import {storage} from '@core/utils'
import {defaultStyles} from '@/constants'
import {defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'Text'}
  stylesState: {}, // {'1': {styles}}
  currentText: '',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
