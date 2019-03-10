import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'

import I18n from '../../i18n'
import RegisterForm from './Register.form'

export interface IProps {
  classes: any
  activeStep: number
  steps: string[]
}

const RegisterView: React.SFC<IProps> = ({ classes, activeStep, steps }) => (
  <div className={classes.root}>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          {I18n.t('register.page.title')}
        </Typography>

        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{I18n.t(label)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <RegisterForm activeStep={activeStep} />
      </Paper>
    </main>
  </div>
)

export default RegisterView
