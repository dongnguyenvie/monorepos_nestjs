import { parse } from 'querystring-es3'
import { generatePath } from 'react-router'
import { ROUTE_RECORDS } from 'router/routes'

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const isAntDesignPro = (): boolean => {
  // if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return true;
  // }
  return window.location.hostname === 'preview.pro.ant.design'
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env
  if (NODE_ENV === 'development') {
    return true
  }
  return isAntDesignPro()
}

export const getPageQuery = () => {
  const { href } = window.location
  const qsIndex = href.indexOf('?')
  const sharpIndex = href.indexOf('#')

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1])
    }

    return parse(href.slice(qsIndex + 1, sharpIndex))
  }

  return {}
}

export const getPathByName = (name: string, params: any = {}) => {
  const route = ROUTE_RECORDS[name]
  return generatePath(route.path as string, { ...params })
}

export const difference = (source: number, target: number) => {
  let status = 'nothing'
  let color = 'secondary'
  const diff = source - target

  if (diff > 0) {
    status = 'up'
    color = 'success'
  } else if (diff < 0) {
    status = 'down'
    color = 'danger'
  }

  return { status, diff, color }
}

export function isJson(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const caculateTyGiaThamKhao = ({ usd, rate, sellLimit, tgLimit }) => {
  const currencyValue = rate * usd // vnd
  const buy = currencyValue - tgLimit
  const sell = buy + sellLimit
  // const sp = Math.abs(sell - buy) // spread

  return { buy, sell, open: rate }
}
