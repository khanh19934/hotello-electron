import axios from 'axios'

import Constants from '../constants/Constants'

const instance = axios.create({
  baseURL: Constants.API_BASE_URL,
  timeout: Constants.API_TIMEOUT
})

export default instance
