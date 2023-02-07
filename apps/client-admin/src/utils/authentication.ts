import Cookies from 'universal-cookie'
import { browserStorage } from 'utils/localStorage'
import { ACCESS_TOKEN_KEY } from 'utils/constants'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
const cookies = new Cookies()

class Authentication {
  getToken() {
    return browserStorage.get(ACCESS_TOKEN_KEY, '')
  }

  getBearerToken() {
    return 'Bearer ' + this.getToken()
  }

  logout() {
    cookies.remove(ACCESS_TOKEN_KEY)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  isLogged() {
    return !!this.getToken()
  }

  getScp() {
    const token = this.getToken()
    const decode = token ? jwt_decode(token) : {}
    // @ts-ignore
    return decode?.scp || []
  }

  isExpired() {
    const token = this.getToken()
    const decode = token ? jwt_decode(token) : {}
    // @ts-ignore
    const isExpired = !token || decode.exp < moment().unix()
    if (!token && isExpired) {
      this.logout()
    }
    return isExpired
  }
  checkRole(role: string) {
    const scp = this.getScp()
    if (scp.includes('all')) {
      return true
    }
    return scp.includes(role)
  }
}

export const authentication = new Authentication()
