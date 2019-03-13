import { withStyles } from '@material-ui/core'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'

import withStateSafe from '../../hocs/withStateSafe.hoc'
import handlers, { componentLifeCycle } from './Register.handler'
import styles from './Register.style'
import RegisterView, { IProps } from './Register.view'

const callback = () => ({
  steps: ['register.step.userInfo', 'register.step.activeCode', 'register.step.completed']
})

const enhance = compose<IProps, IProps>(
  withStyles(styles as any),
  withProps(callback),
  withStateSafe('activeStep', 'setActiveStep', 0),
  withStateSafe('countryList', 'setCountryList', []),
  withStateSafe('cityList', 'setCityList', []),
  withStateSafe('districtList', 'setDistrictList', []),
  withStateSafe('selectedCountry', 'setSelectedCountry', 0),
  withStateSafe('selectedCity', 'setSelectedCity', 0),
  withStateSafe('selectedDistrict', 'setSelectedDistrict', 0),
  withStateSafe('userInfo', 'setUserInfo', {}),
  withStateSafe('otpCode', 'setOtpCode', ''),
  withStateSafe('showResendCountDown', 'setShowResendCountDown', false),
  withHandlers(handlers),
  lifecycle(componentLifeCycle)
)

export default enhance(RegisterView)
