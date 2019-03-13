import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  withStyles
} from '@material-ui/core'
import { InjectedFormikProps, withFormik } from 'formik'
import React from 'react'
import { compose } from 'recompose'

import TextInput from '../../../../components/TextInput/TextInput.component'
import I18n from '../../../../i18n'
import { ICity, ICountry, IDistrict } from '../../../../model'
import { getFieldProps, validation } from '../../../../utils/form.util'
import { emailValidation, requireValue } from '../../../../validates'
import styles from './UserInfoForm.style'

interface IFormValues {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string

  address: string
}

interface IFormProps {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string

  address?: string
  selectedCountry: ICountry
  selectedCity: string
  selectedDistrict: string
  onSubmitRegisterForm(value: IFormValues): any
  classes: any
  countryList: ICountry[]
  cityList: ICity[]
  districtList: IDistrict[]
  onSelectCountry(e: any): any
  onSelectCity(e: any): any
  onSelectDistrict(e: any): any
}

interface IProps {
  onSubmitRegisterForm(values: IFormValues): any
  classes: any
  selectedCountry: number
  selectedCity: number
  selectedDistrict: number
  countryList: ICountry[]
  districtList: IDistrict[]
  cityList: ICity[]
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  phoneNumber?: string

  address?: string
  onSelectCountry(e: any): any
  onSelectCity(e: any): any
  onSelectDistrict(e: any): any
}

const UserInfoForm: React.SFC<InjectedFormikProps<IProps, IFormValues>> = props => {
  const inputProps = getFieldProps(props)
  const { classes, countryList, onSelectCountry, onSelectCity, onSelectDistrict, isSubmitting } = props

  const disable = isSubmitting || !props.isValid

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom={true}>
        {I18n.t('register.step.userInfo')}
      </Typography>
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput
              fieldProps={inputProps}
              name="firstName"
              textLabel={I18n.t('register.userInfo.form.firstName')}
            />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput fieldProps={inputProps} name="lastName" textLabel={I18n.t('register.userInfo.form.lastName')} />
          </FormControl>
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <FormControl margin="normal" required={true} fullWidth={true}>
            <TextInput
              fieldProps={inputProps}
              name="phoneNumber"
              textLabel={I18n.t('register.userInfo.form.phoneNumber')}
            />
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
        <Grid item={true} xs={12} sm={6}>
          <FormControl fullWidth={true}>
            <InputLabel>{I18n.t('register.userInfo.form.country')}</InputLabel>
            <Select
              value={props.selectedCountry === 0 ? '' : props.selectedCountry}
              onChange={onSelectCountry}
              input={<Input name="age" id="age-helper" />}
            >
              {countryList.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <FormControl fullWidth={true} disabled={props.selectedCountry === 0}>
            <InputLabel>{I18n.t('register.userInfo.form.city')}</InputLabel>
            <Select
              value={props.selectedCity === 0 ? '' : props.selectedCity}
              onChange={onSelectCity}
              input={<Input name="age" id="age-helper" />}
            >
              {props.cityList.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12} sm={6}>
          <FormControl fullWidth={true} disabled={props.selectedCity === 0}>
            <InputLabel>{I18n.t('register.userInfo.form.state')}</InputLabel>
            <Select
              value={props.selectedDistrict === 0 ? '' : props.selectedDistrict}
              onChange={onSelectDistrict}
              input={<Input name="age" id="age-helper" />}
            >
              {props.districtList.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item={true} xs={12}>
          <div className={classes.buttons}>
            <Button
              disabled={disable}
              variant="contained"
              color="primary"
              onClick={props.handleSubmit as any}
              className={classes.button}
              size="medium"
              fullWidth={true}
            >
              {I18n.t('register.userInfo.form.buttonTitle')}
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const validateArr = [
  {
    key: 'email',
    validates: [
      {
        validate: requireValue,
        message: 'signIn.form.email.error.required'
      },
      {
        validate: emailValidation,
        message: 'signIn.form.email.error.emailValidation'
      }
    ]
  },
  {
    key: 'password',
    validates: [
      {
        validate: requireValue,
        message: 'signIn.form.password.error.required'
      }
    ]
  },
  {
    key: 'firstName',
    validates: [
      {
        validate: requireValue,
        message: 'register.userInfo.form.firstName.error.required'
      }
    ]
  },
  {
    key: 'lastName',
    validates: [
      {
        validate: requireValue,
        message: 'register.userInfo.form.lastName.error.required'
      }
    ]
  },
  {
    key: 'phoneNumber',
    validates: [
      {
        validate: requireValue,
        message: 'register.userInfo.form.phoneNumber.error.required'
      }
    ]
  },
  {
    key: 'address',
    validates: [
      {
        validate: requireValue,
        message: 'register.userInfo.form.address.error.required'
      }
    ]
  }
]

const configs = {
  mapPropsToValues: (props: IProps) => ({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  }),
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
    try {
      setSubmitting(true)
      const payload = {
        email: values.email,
        password: values.password,
        address: values.address,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        cityId: props.selectedCity,
        countryId: props.selectedCountry,
        districtId: props.selectedDistrict
      }
      props.onSubmitRegisterForm(payload)
      setSubmitting(false)
    } catch (e) {
      setSubmitting(false)
    }
  },
  validate: validation(validateArr)
}

const enhance = compose<any, any>(
  withStyles(styles),
  // @ts-ignore
  withFormik(configs)
)

export default enhance(UserInfoForm)
