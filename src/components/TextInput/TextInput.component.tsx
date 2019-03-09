import { FormHelperText, Input, InputLabel } from '@material-ui/core'
import { isNilOrEmpty } from 'ramda-adjunct'
import * as React from 'react'
import { compose, withHandlers, withState } from 'recompose'

import { InputProps } from '@material-ui/core/Input'
import withFlatFieldProps from '../../hocs/withFlatFieldProps.hoc'

interface IProps {
  touched: boolean
  error: string
  setValue(v): void
  handleOnFocus(): void
  handleOnBlur(): void
  setFocused(): void
  textLabel?: string
  focused: boolean
  showError: boolean
  autoFocus?: boolean
  name: string
  fieldProps: any
  type?: string
}

const TextInput: React.SFC<IProps & InputProps> = ({
  touched,
  error,
  setValue,
  handleOnBlur,
  handleOnFocus,
  textLabel,
  type,
  focused,
  showError = true
}) => (
  <React.Fragment>
    <InputLabel error={touched && !isNilOrEmpty(error)}>{textLabel}</InputLabel>
    <Input
      onChange={e => setValue(e.target.value)}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      type={type}
      error={touched && !isNilOrEmpty(error)}
    />
    {touched && error && (
      <FormHelperText id="component-error-text" error={touched && !isNilOrEmpty(error)}>
        {error}
      </FormHelperText>
    )}
  </React.Fragment>
)

interface IOutProps {
  setTouched(): void
  setFocused(focused: boolean): void
}
const handlers = {
  handleOnFocus: ({ setFocused }: IOutProps) => () => {
    setFocused(true)
  },
  handleOnBlur: ({ setFocused, setTouched }: IOutProps) => () => {
    // TODO: consider replace by onEndEditing to update value
    setFocused(false)
    setTouched()
  }
}
const enhance = compose<IProps & InputProps, InputProps & { fieldProps: {}; textLabel?: string }>(
  withFlatFieldProps,
  withState('focused', 'setFocused', false),
  withHandlers(handlers)
)

export { handlers, TextInput }

export default enhance(TextInput)
