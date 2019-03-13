import { CssBaseline, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'

import I18n from '../../i18n'
import { ICity, ICountry, IDistrict } from '../../model'
import RegisterForm from './Register.form'

export interface IProps {
  classes: any
  activeStep: number
  steps: string[]
  SUBMIT_REGISTER(values: any): void
  selectedCountry: ICountry
  selectedCity: string
  selectedDistrict: string
  countryList: ICountry[]
  cityList: ICity[]
  districtList: IDistrict[]
  SELECT_COUNTRY(e: any): void
  SELECT_CITY(e: any): void
  SELECT_DISTRICT(e: any): void
  setOtpCode(s: string): void
  otpCode: string
  HIDE_RESEND_OTP(): void
  SHOW_RESEND_OTP(): void
  SUBMIT_OTP(): void
  showResendCountDown: boolean
}

const RegisterView: React.SFC<IProps> = ({
  classes,
  activeStep,
  steps,
  SUBMIT_REGISTER,
  selectedCountry,
  selectedCity,
  selectedDistrict,
  countryList,
  cityList,
  districtList,
  SELECT_COUNTRY,
  SELECT_CITY,
  SELECT_DISTRICT,
  setOtpCode,
  otpCode,
  SHOW_RESEND_OTP,
  HIDE_RESEND_OTP,
  SUBMIT_OTP,
  showResendCountDown
}) => (
  <React.Fragment>
    <CssBaseline />
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

          <RegisterForm
            activeStep={activeStep}
            onSubmitRegisterForm={SUBMIT_REGISTER}
            selectedCountry={selectedCountry}
            selectedCity={selectedCity}
            selectedDistrict={selectedDistrict}
            countryList={countryList}
            cityList={cityList}
            districtList={districtList}
            onSelectCountry={SELECT_COUNTRY}
            onSelectCity={SELECT_CITY}
            onSelectDistrict={SELECT_DISTRICT}
            onSetOTPCode={setOtpCode}
            otpCode={otpCode}
            onShowResendOTP={SHOW_RESEND_OTP}
            onHideResendOTP={HIDE_RESEND_OTP}
            showResendCountDown={showResendCountDown}
            onSubmitOTPCode={SUBMIT_OTP}
          />
        </Paper>
      </main>
    </div>
  </React.Fragment>
)

export default RegisterView
