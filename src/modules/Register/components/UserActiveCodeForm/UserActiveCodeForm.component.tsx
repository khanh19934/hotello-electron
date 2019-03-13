import { Button, Grid, Typography, withStyles } from '@material-ui/core'
import React from 'react'
import 'typeface-open-sans'

import CountDownText from '../../../../components/CountDownText/CountDownText.component'
import OTPInput from '../../../../components/OTPInput/OTPInput.component'
import I18n from '../../../../i18n'
import styles from './UserActiveCodeForm.style'

const UserActiveCodeForm = ({
  classes,
  onSetOTPCode,
  otpCode,
  showResendCountDown,
  onHideResendOTP,
  onShowResendOTP,
  onSubmitOTPCode
}) => (
  <React.Fragment>
    <Typography variant="title" align="center" gutterBottom={true}>
      {I18n.t('register.userActiveCode.title')}
    </Typography>

    <Typography variant="body1" align="center" gutterBottom={true}>
      {I18n.t('register.userActiveCode.description')}
    </Typography>
    <div className={classes.otpSection}>
      <OTPInput
        inputStyle={{ width: '2rem', height: '2.2rem', fontSize: '1.5rem', outline: 'none' }}
        separator={<span className={classes.spanStyle}>-</span>}
        numInputs={6}
        isInputNum={true}
        onChange={onSetOTPCode}
        shouldAutoFocus={true}
      />
    </div>
    <Grid container={true} spacing={24}>
      <Grid item={true} xs={12} sm={4} />
      <Grid item={true} xs={12} sm={4}>
        <Button
          onClick={onSubmitOTPCode}
          fullWidth={true}
          color="primary"
          variant="contained"
          disabled={otpCode.length < 6}
        >
          {I18n.t('register.userActiveCode.buttonTitle')}
        </Button>
      </Grid>
    </Grid>
    <div className={classes.resendOTPSection}>
      {showResendCountDown ? (
        <Typography className={classes.resendOTPText} align="center" onClick={onShowResendOTP}>
          {I18n.t('register.userActiveCode.resendingCode')}
        </Typography>
      ) : (
        <Typography className={classes.resendOTPText} align="center" onClick={onShowResendOTP}>
          {I18n.t('register.userActiveCode.resendCode')}
        </Typography>
      )}

      {showResendCountDown && <CountDownText onFinish={onHideResendOTP} start={30} />}
    </div>
  </React.Fragment>
)

export default withStyles(styles)(UserActiveCodeForm)
