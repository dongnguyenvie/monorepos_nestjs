import { browserStorage } from './localStorage'
import { APP_SETTINGS } from './constants'
import { AppSettings } from 'types/Utils'

export function slugify(string: String) {
  const a = 'àáảãạâấầẩẫậắằẳẵặäåæąçćčđďèéẻẽẹěėëêếềểễệęğǵḧìíỉĩịïîįłḿǹńňñòóỏõọöôốồổỗộơớờởỡợœøṕŕřßşśšșťțùúủũụüûǘůűūưứừửữựųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaaaaaaaaaaaaacccddeeeeeeeeeeeeeeegghiiiiiiiilmnnnnooooooooooooooooooooprrsssssttuuuuuuuuuuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function titleIfy(slug: String) {
  var words = slug.split('-')
  for (var i = 0; i < words.length; i++) {
    var word = words[i]
    words[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }
  return words.join(' ')
}

export function getTrimmedString(string: String, length = 8) {
  if (string.length <= length) {
    return string
  } else {
    return string.substring(0, length) + '...'
  }
}

export function buildStructureMenu(dataRaw: any) {
  var source: any = []
  var items: any = []
  // build hierarchical source.
  for (let i = 0; i < dataRaw.length; i++) {
    var item = dataRaw[i]
    var label = item['text']
    var parentid = item['parentid']
    var id = item['id']

    if (items[parentid]) {
      let _item = { parentid: parentid, label: label, item: item }
      if (!items[parentid].items) {
        items[parentid].items = []
      }
      items[parentid].items[items[parentid].items.length] = item
      items[id] = _item
    } else {
      items[id] = { parentid: parentid, label: label, item: item }
      source[id] = items[id]
    }
  }
  return source
}

export const roundNum = (num: number, decimalPlaces: number) => {
  const factorOften = Math.pow(10, decimalPlaces)
  return Math.round(num * factorOften) / factorOften
}

export const vndFormatter2 = (val: number) => {
  return new Intl.NumberFormat('ja-JP').format(roundNum(val, -3))
}

export const vndFormatter3 = (val: number) => {
  return new Intl.NumberFormat('ja-JP').format(roundNum(val, -3) / 1000)
}

export const vndFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  // minimumFractionDigits: 2,
})

export const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export const onAppSettings = {
  get: (): AppSettings => {
    return browserStorage.get(APP_SETTINGS) || onAppSettings.defaultValue()
  },
  set: (val: AppSettings): boolean => {
    return browserStorage.set(APP_SETTINGS, val)
  },
  defaultValue: (): AppSettings => ({
    theme: 'dark',
    dashboard: {
      menu: {
        keySelected: ['0'],
        keyOpened: [],
      },
    },
    path: '/',
    isLocalMapping: false,
    settings: [],
  }),
}

// export const formatVND = val => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val)
