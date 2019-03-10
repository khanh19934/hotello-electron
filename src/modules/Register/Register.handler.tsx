import { History } from 'history'
import { HandleCreators } from 'recompose'

interface IHandlerProps {
  history: History
}

interface IHandlers {
  SUBMIT_REGISTER(): void
  HANDLE_NEXT_STEP(): void
}

const handlers: HandleCreators<IHandlerProps, IHandlers> = {
  SUBMIT_REGISTER: () => () => {
    console.log('ok')
  },
  HANDLE_NEXT_STEP: () => () => {
    console.log('ok')
  }
}

export default handlers
