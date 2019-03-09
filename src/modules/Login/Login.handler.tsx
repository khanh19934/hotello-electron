import { History } from 'history'
import { HandleCreators } from 'recompose'

import * as authServices from '../../services/auth.services'
import Routes from '../Navigator/Navigator.route'

interface IHandlerProps {
  history: History
}

interface IHandlers {
  SUBMIT_LOGIN(payload: { email: string; password: string }): void
  NAVIGATE_TO_REGISTER(): void
}

const handlers: HandleCreators<IHandlerProps, IHandlers> = {
  SUBMIT_LOGIN: ({ history }) => async payload => {
    try {
      await authServices.loginServices(payload)
      history.push(Routes.Home)

      return true
    } catch (e) {
      return false
    }
  },
  NAVIGATE_TO_REGISTER: ({ history }) => () => {
    history.push(Routes.Register)
  }
}

export default handlers
