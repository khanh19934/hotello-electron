import { Paper, Typography } from '@material-ui/core'
import * as React from 'react'

import I18n from '../../i18n'
import LoginForm from './Login.form'

export interface IProps {
  classes: any
  SUBMIT_LOGIN(): void
  NAVIGATE_TO_REGISTER(): void
}

const Login: React.SFC<IProps> = ({ classes, SUBMIT_LOGIN, NAVIGATE_TO_REGISTER }) => {
  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            {I18n.t('signIn.form.title')}
          </Typography>
          <form className={classes.form}>
            <LoginForm onNavigateRegister={NAVIGATE_TO_REGISTER} classes={classes} onSubmit={SUBMIT_LOGIN} />
          </form>
        </Paper>
      </main>
    </div>
  )
}

export default Login
