import { Button, FormControl, Grid, Typography, withStyles } from '@material-ui/core'
import { InjectedFormikProps, withFormik } from 'formik'
import { always } from 'ramda'
import React from 'react'
import { compose } from 'recompose'

import TextInput from '../../../../components/TextInput/TextInput.component'
import I18n from '../../../../i18n'
// import { getFieldProps, validation } from '../../../../utils/form.util'
import { getFieldProps } from '../../../../utils/form.util'
import styles from './UserInfoForm.style'

interface IFormValues {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  zipCode: string
  city: string
  state: string
  country: string
  address: string
  hotelName: string
}

interface IFormProps {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string
  zipCode?: string
  city?: string
  state?: string
  country?: string
  address?: string
  hotelName?: string
  onSubmit(value: IFormValues): any
  classes: any
}

interface IProps {
  onSubmit(values: IFormValues): any
  classes: any
}

const UserInfoForm: React.SFC<InjectedFormikProps<IProps, IFormValues>> = props => {
  const inputProps = getFieldProps(props)
  const { classes } = props

  // const disable = isSubmitting || !props.isValid

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom={true}>
        {I18n.t('register.step.userInfo')}
      </Typography>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="firstName" textLabel={I18n.t('register.userInfo.form.firstName')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="lastName" textLabel={I18n.t('register.userInfo.form.lastName')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="phoneNumber" textLabel={I18n.t('register.userInfo.form.phoneNumber')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="email" textLabel={I18n.t('register.userInfo.form.email')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput
              fieldProps={inputProps}
              type="password"
              name="password"
              textLabel={I18n.t('register.userInfo.form.password')}
            />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="address" textLabel={I18n.t('register.userInfo.form.address')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="hotelName" textLabel={I18n.t('register.userInfo.form.hotelName')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="city" textLabel={I18n.t('register.userInfo.form.city')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="state" textLabel={I18n.t('register.userInfo.form.state')} />
          </FormControl>
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="zipCode" textLabel={I18n.t('register.userInfo.form.zipCode')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="country" textLabel={I18n.t('register.userInfo.form.country')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12}>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" onClick={props.handleSubmit as any} className={classes.button}>
              {'Next'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const initialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  zipCode: '',
  state: '',
  city: '',
  country: '',
  address: '',
  hotelName: ''
}

// const validateArr = [
//   {
//     key: 'email',
//     validates: [
//       {
//         validate: requireValue,
//         message: 'signIn.form.email.error.required'
//       },
//       {
//         validate: emailValidation,
//         message: 'signIn.form.email.error.emailValidation'
//       }
//     ]
//   },
//   {
//     key: 'password',
//     validates: [
//       {
//         validate: requireValue,
//         message: 'signIn.form.password.error.required'
//       }
//     ]
//   }
// ]

const configs = {
  mapPropsToValues: always(initialValues),
  handleSubmit: async (
    values: IFormValues,
    {
      setSubmitting,
      props,
      resetForm
    }: {
      setSubmitting(s: boolean): void
      props: IFormProps
      resetForm(s: IFormValues): void
    }
  ) => {
    console.log(values)
  }
  // validate: validation(validateArr)
}

const enhance = compose<any, any>(
  withStyles(styles),
  withFormik(configs)
)

export default enhance(UserInfoForm)
