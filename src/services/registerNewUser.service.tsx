import { pathOr } from 'ramda'

import { IUserInfo } from '../model'
import axiosNoToken from './axiosNoToken'

const getCreatedUserInfo = pathOr({}, ['data', 'data'])
const registerNewUser = (payload): Promise<IUserInfo> =>
  axiosNoToken.post('/register', payload).then(getCreatedUserInfo)

const getListCountryData = pathOr({}, ['data', 'data'])
const getListCountry = () => axiosNoToken.get('/countries').then(getListCountryData)

const getListCityData = pathOr({}, ['data', 'data'])
const getListCity = countries_id => axiosNoToken.get(`/cities/${countries_id}`).then(getListCityData)

const getListDistrictData = pathOr({}, ['data', 'data'])
const getListDistrict = city_id => axiosNoToken.get(`/districts/${city_id}`).then(getListDistrictData)

const requestOTP = (id: number) => axiosNoToken.post('/register/request-otp', { id })

const validateOTP = (id: number, otpCode: string) =>
  axiosNoToken.post('/register/validate-otp', { id, otpCode }).then(res => {
    if (res.data.message === 'OTP_NOT_CORRECT') {
      throw new Error(res.data.message)
    }

    return true
  })

export { registerNewUser, getListCountry, getListCity, getListDistrict, requestOTP, validateOTP }
