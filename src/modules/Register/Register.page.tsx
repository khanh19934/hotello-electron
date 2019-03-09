import { compose, withHandlers } from 'recompose'

import handlers from './Register.handler'
import RegisterView from './Register.view'

const enhance = compose(withHandlers(handlers))

export default enhance(RegisterView)
