import {TABLE_RESIZE} from '@/redux/types'
import {CHANGE_TEXT} from '@/redux/types'
import {CHANGE_STYLES} from '@/redux/types'
import {APPLY_STYLE} from '@/redux/types'
import {CHANGE_TITLE} from '@/redux/types'
import {UPDATE_DATE} from '@/redux/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}
