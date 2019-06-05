const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // val is Date 是类型保护
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // val is Object 是类型保护
  return val !== null && typeof val === 'object'
}
