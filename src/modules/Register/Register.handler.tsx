import { History } from 'history'
import { HandleCreators, ReactLifeCycleFunctions } from 'recompose'
import { ICity, ICountry, IDistrict, IUserInfo } from '../../model'
import * as registerNewUserServices from '../../services/registerNewUser.service'

interface IHandlerProps {
  history: History
  setSelectedCountry(s: ICountry): void
  setSelectedCity(s: ICity | any): void
  setSelectedDistrict(s: IDistrict | any): void
  setCityList(s: ICity[]): void
  setDistrictList(s: IDistrict[]): void
  setActiveStep(s: number): void
  setUserInfo(s: IUserInfo): void
  setShowResendCountDown(s: boolean): void
  userInfo: IUserInfo
  otpCode: string
}

interface IRegisterFormValue {
  email: string
  password: string
  address: string
  cityId: number
  countryId: number
  districtId: number
  phoneNumber: string
  firstName: string
  lastName: string
}

interface IHandlers {
  SUBMIT_REGISTER(values: IRegisterFormValue): void
  SELECT_COUNTRY(e: any): void
  SELECT_CITY(e: any): void
  SELECT_DISTRICT(e: any): void
  HIDE_RESEND_OTP(): void
  SHOW_RESEND_OTP(): void
  SUBMIT_OTP(): void
}

const handlers: HandleCreators<IHandlerProps, IHandlers> = {
  SUBMIT_REGISTER: ({ setActiveStep, setUserInfo }) => async (values: IRegisterFormValue) => {
    const res = await registerNewUserServices.registerNewUser(values)
    setActiveStep(1)
    setUserInfo(res)
    await registerNewUserServices.requestOTP(res.id)
  },
  SELECT_COUNTRY: ({ setSelectedCountry, setSelectedCity, setSelectedDistrict, setCityList }) => async (e: any) => {
    setSelectedCountry(e.target.value)
    setSelectedCity(0)
    setSelectedDistrict(0)
    const res = await registerNewUserServices.getListCity(e.target.value)

    setCityList(res)
  },
  SELECT_CITY: ({ setSelectedCity, setSelectedDistrict, setDistrictList }) => async (e: any) => {
    setSelectedCity(e.target.value)
    setSelectedDistrict(0)
    const res = await registerNewUserServices.getListDistrict(e.target.value)
    setDistrictList(res)
  },
  SELECT_DISTRICT: ({ setSelectedDistrict }) => (e: any) => {
    setSelectedDistrict(e.target.value)
  },
  SHOW_RESEND_OTP: ({ setShowResendCountDown, userInfo }) => async () => {
    setShowResendCountDown(true)
    await registerNewUserServices.requestOTP(userInfo.id)
  },
  HIDE_RESEND_OTP: ({ setShowResendCountDown }) => () => {
    setShowResendCountDown(false)
  },
  SUBMIT_OTP: ({ otpCode, userInfo, setActiveStep }) => async () => {
    try {
      await registerNewUserServices.validateOTP(userInfo.id, otpCode)
      setActiveStep(2)
    } catch (e) {
      console.log('error', e)
    }
  }
}

interface ILifeCycleProps {
  setCountryList(s: any[]): void
}
const componentLifeCycle: ReactLifeCycleFunctions<ILifeCycleProps, any, any> = {
  async componentDidMount() {
    const res = await registerNewUserServices.getListCountry()

    this.props.setCountryList(res)
  }
}

export { componentLifeCycle }

export default handlers
