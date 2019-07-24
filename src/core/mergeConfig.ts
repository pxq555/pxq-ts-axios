import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1) // 合并操作是为来返回val1的拷贝对象，返回val1的引用对象进行操作会改变原始值
  } else {
    return val1
  }
}

// 有这三种值的时候使用正常merge方式。
const stratKeysFromVal2 = ['url', 'data', 'params']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// 对一下这些值进行深拷贝
const stratkeysDeepMerge = ['headers', 'auth']

stratkeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeFied(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeFied(key)
    }
  }
  function mergeFied(key: string): void {
    let strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
