import axios from 'axios'

import Constants from '../constants/Constants'

const instance = axios.create({
  baseURL: Constants.API_BASE_URL,
  timeout: Constants.API_TIMEOUT
})

export const setAuthToken = (tk: string) => {
  instance.defaults.headers.common.authorization = `${tk}`
}

export const clearAuthToken = () => {
  instance.defaults.headers.common.authorization = ''
}

export default instance
