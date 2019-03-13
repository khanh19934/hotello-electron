export default theme => ({
  spanStyle: {
    width: '3rem',
    display: 'flex',
    justifyContent: 'center'
  },
  otpSection: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  inputStyle: {
    width: '1.5rem',
    height: '1rem'
  },
  resendOTPText: {
    marginRight: '0.3rem',
    color: '#7dce94'
  },
  resendOTPSection: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingTop: '1.3rem'
  }
})
