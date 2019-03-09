import { History } from 'history'
import { HandleCreators } from 'recompose'

interface IHandlerProps {
  history: History
}

interface IHandlers {
  SUBMIT_REGISTER
}

const handlers: HandleCreators<IHandlerProps, IHandlers> = {
  SUBMIT_REGISTER: () => () => {
    console.log('ok')
  }
}

export default handlers
