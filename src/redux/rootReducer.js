import {TABLE_RESIZE} from '@/redux/types'
import {CHANGE_TEXT} from '@/redux/types'
import {CHANGE_STYLES} from '@/redux/types'
import {APPLY_STYLE} from '@/redux/types'
import {CHANGE_TITLE} from '@/redux/types'
import {UPDATE_DATE} from '@/redux/types'
import {CLEAR_STATE} from '@/redux/types'
import {defaultStyles} from '@/constants'

export function rootReducer(state, action) {
  let field
  let val

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, action)
      }
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field]
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    case UPDATE_DATE:
      return {...state, openDate: new Date().toJSON()}
    case CLEAR_STATE:
      action.data.fields.forEach(field => {
        val = state[field]
        action.data.group.forEach($el => {
          val[$el.id()] = field === 'dataState'
            ? ''
            : {...defaultStyles}
        })
      })
      return {
        ...state,
        currentText: '',
        currentStyles: {...defaultStyles}
      }
    default:
      return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
