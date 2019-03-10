import { withStyles } from '@material-ui/core'
import { compose, withHandlers, withProps } from 'recompose'

import withStateSafe from '../../hocs/withStateSafe.hoc'
import handlers from './Register.handler'
import styles from './Register.style'
import RegisterView, { IProps } from './Register.view'

const callback = () => ({
  steps: ['register.step.userInfo', 'register.step.activeCode', 'register.step.completed']
})

const enhance = compose<IProps, IProps>(
  withStyles(styles as any),
  withProps(callback),
  withStateSafe('activeStep', 'setActiveStep', 0),
  withHandlers(handlers)
)

export default enhance(RegisterView)
