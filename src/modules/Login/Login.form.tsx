import { Button, FormControl, Link } from '@material-ui/core'
import { InjectedFormikProps, withFormik } from 'formik'
import { always } from 'ramda'
import * as React from 'react'

import TextInput from '../../components/TextInput/TextInput.component'
import { getFieldProps, validation } from '../../utils/form.util'
import { emailValidation, requireValue } from '../../validates'

import I18n from '../../i18n'

interface IFormValues {
  email: string
  password: string
}

interface IFormProps {
  email?: string
  password?: string
  onSubmit(value: IFormValues): any
  onNavigateRegister(): void
  classes: any
}

interface IProps {
  onSubmit(values: IFormValues): any
  classes: any
  onNavigateRegister(): void
}

const InnerForm: React.SFC<InjectedFormikProps<IProps, IFormValues>> = props => {
  const inputProps = getFieldProps(props)
  const { classes, onNavigateRegister, isSubmitting } = props

  const disable = isSubmitting || !props.isValid

  return (
    <React.Fragment>
      <FormControl margin="normal" required={true} fullWidth={true}>
        <TextInput autoFocus={true} fieldProps={inputProps} name="email" textLabel={I18n.t('signIn.form.label.email')} />
      </FormControl>
      <FormControl className={classes.textField} margin="normal" required={true} fullWidth={true}>
        <TextInput fieldProps={inputProps} name="password" textLabel={I18n.t('signIn.form.label.password')} type="password" />
      </FormControl>

      <Link onClick={onNavigateRegister}>{I18n.t('signIn.form.register')}</Link>

      <Button
        type="button"
        onClick={props.handleSubmit as any}
        fullWidth={true}
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={disable}
      >
        {I18n.t('signIn.form.button.submit')}
      </Button>
    </React.Fragment>
  )
}

const initialValues = {
  email: '',
  password: ''
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
  }
]

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
    props.onSubmit(values)
  },
  validate: validation(validateArr)
}

export { configs, InnerForm }
export default withFormik(configs)(InnerForm)
