import { withStyles } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'

import handlers from './Login.handler'
import styles from './Login.style'
import Login, { IProps } from './Login.view'

const enhance = compose<IProps, IProps>(
  withStyles(styles as any),
  withHandlers(handlers)
)

export default enhance(Login)
