import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@core/utils'
import {debounce} from '@core/utils'
import {Page} from '@core/Page'
import {normalizeInitialState} from '@/redux/initialState'

function storageName(params) {
  return 'excel:' + params
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const stateId = storageName(params)

    const state = storage(stateId)
    const initialState = normalizeInitialState(state)

    const store = createStore(rootReducer, initialState)

    const stateListener = debounce(state => {
      storage(stateId, state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
