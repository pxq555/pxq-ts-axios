const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  // val is Date 是类型保护
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
  // 判断是否为普通对象，区别于FormData、ArrayBuffer这些对象
  return toString.call(val) === '[object Object]'
}

export function isFromData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 将多个对象中的值合并到一个对象中
// 下面写的深拷贝对象，同样的属性值，最后合并出来的值以靠后的参数为准。
export function deepMerge(...objs: any[]): any {
  // objs -> [{accept: ''}, {accept: ''}]
  let result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
