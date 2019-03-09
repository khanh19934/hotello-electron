import { pathOr } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'
import { getAccessToken, saveAccessToken } from '../storage/app.storage'
import axiosApi, { setAuthToken } from './axiosApi'

const loginServices = payload =>
  axiosApi.post('/login', payload).then(res => {
    const token = pathOr<string>('', ['data', 'accessToken'])(res)

    setAuthToken(token)
    saveAccessToken(token)

    return token
  })

const checkToken = () => {
  const token = getAccessToken()

  return isNilOrEmpty(token)
}

export { loginServices, checkToken }
