import { LOCALSTORAGE_PREFIX } from './constants'
import { LocalStorageEx } from 'types/Utils'
import isString from 'lodash/isString'

class LocalStorage implements LocalStorageEx {
  _prefix = LOCALSTORAGE_PREFIX

  set(key: string, value: any) {
    let flg = true
    try {
      const _key = this.getKey(key)
      let _value = isString(value) ? value : JSON.stringify(value)
      localStorage.setItem(_key, _value)
    } catch (error) {
      flg = false
    }
    return flg
  }

  get(key: string, defaultValue?: any) {
    const _key = this.getKey(key)
    let _value = null
    try {
      _value = JSON.parse(localStorage.getItem(_key) as any)
    } catch (error) {
      _value = localStorage.getItem(_key) as any
    }
    return _value || defaultValue
  }

  clearAll() {
    let flg = true
    try {
      localStorage.clear()
    } catch (error) {
      flg = false
    }
    return flg
  }

  clear(key: string) {
    let flg = true
    try {
      const _key = this.getKey(key)
      localStorage.removeItem(_key)
    } catch (error) {
      flg = false
    }
    return flg
  }

  getKey(key: string) {
    return key
  }
}

export const browserStorage = new LocalStorage()
