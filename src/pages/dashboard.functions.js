import {storage} from '@core/utils'

function toHTML(stateId) {
  const state = storage(stateId)
  const id = stateId.replace(':', '/')
  return `
    <li class="db__record">
      <a href="#${id}">${state.title}</a>
      <strong>
        ${new Date(state.openDate).toLocaleDateString()}
        ${new Date(state.openDate).toLocaleTimeString()}
      </strong>
    </li>
  `
}

// [excel:id]
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}
