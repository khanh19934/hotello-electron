import { propEq } from 'ramda'
import renderWhen from '../../hocs/renderWhen.hoc'

import RegisterCompleted from './components/RegisterComplete/RegisterComplete.component'
import UserActiveCodeForm from './components/UserActiveCodeForm/UserActiveCodeForm.component'
import UserInfoForm from './components/UserInfoForm/UserInfoForm.component'

const isUserInfoFormStep = propEq('activeStep', 0)
const isUserActiveCodeFormStep = propEq('activeStep', 1)

// interface IProps {
//   activeStep?: number
// }

const RegisterForm = renderWhen([
  {
    when: isUserInfoFormStep,
    render: UserInfoForm
  },
  {
    when: isUserActiveCodeFormStep,
    render: UserActiveCodeForm
  }
])(RegisterCompleted)

export default RegisterForm

// <IProps, IProps, IProps, IProps, IProps>
