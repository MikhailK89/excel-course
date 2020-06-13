export function parse(value = '') {
  if (isFormula(value)) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      return value
    }
  }
  return value
}

export function isFormula(value) {
  return value.startsWith('=')
}
