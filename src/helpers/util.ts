const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // val is Date 是类型保护
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // val is Object 是类型保护
  return val !== null && typeof val === 'object'
}

export function isPlainObject (val: any): val is Object { // 判断是否为普通对象，区别于FormData、ArrayBuffer这些对象
  return toString.call(val) === '[object Object]'
}