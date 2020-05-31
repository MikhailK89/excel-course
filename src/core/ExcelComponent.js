import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // настраиваем компонент до init
  prepare() {}

  // возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // сюда приходят изменения только по тем полям, на которые мы подписались
  storeChanged() {}

  // проверка подписки на ключи состояния
  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // инициализируем компонент
  // добавляем dom-слушателей
  init() {
    this.initDOMListeners()
  }

  // удаляем компонент
  // чистим dom-слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
