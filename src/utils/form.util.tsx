import { path, pick, prop, propOr } from 'ramda'
import { HandleCreators } from 'recompose'

import I18n from '../i18n'

type MessageCreator<T> = (value: T) => string

interface IValidate<T> {
  validate(values: T): boolean
  message: string | MessageCreator<any>
}

interface IValidateFnArr<T> {
  key: string
  // tslint:disable-next-line:prefer-array-literal
  validates: Array<IValidate<T>>
}
// tslint:disable-next-line:prefer-array-literal
const validation = (validateFnArr: Array<IValidateFnArr<any>>) => (values, props) =>
  validateFnArr.reduce((prevValue, currentItem) => {
    const pathOfValue = currentItem.key.split('.')
    const currValue = path(pathOfValue)(values)
    for (const validator of currentItem.validates) {
      const message = !validator.validate(currValue) && validator.message
      if (!message) continue

      return {
        ...prevValue,
        [pathOfValue[0]]: typeof message === 'function' ? message(currValue) : I18n.t(message)
      }
    }

    return prevValue
  }, {})

const getFieldProps = pick(['values', 'errors', 'touched', 'setFieldValue', 'setFieldTouched', 'setFieldError'])

type Name = string

interface InputProps<T> {
  name: Name
  value?: T
  touched: boolean
  error?: string
}

export interface IFieldProps<T, K> {
  values: T
  touched: object
  errors: Record<string, string>
  setFieldError(field: string, errorMsg: string): void
  setFieldValue(name: string, val: K): void
  setFieldTouched(name: string): void
}

const mapFieldPropsToInputProps = <T extends {}, K>(
  name: Name,
  { values, touched, errors }: IFieldProps<T, K>
): InputProps<K> => ({
  name,
  value: prop(name)(values),
  touched: propOr(false, name, touched),
  error: prop(name)(errors)
})

interface IOwnProps<T, TValueType> {
  name: Name
  fieldProps: IFieldProps<T, TValueType>
}

interface IInputHandlers<T> {
  setValue(v: T): void
  setTouched(): void
}

interface IInputHandleCreators<T, TValueType> extends HandleCreators<IOwnProps<T, TValueType>, IInputHandlers<TValueType>> {}

// tslint:disable-next-line:no-any
const inputHandlers: IInputHandleCreators<object, any> = {
  setValue: props => value => props.fieldProps.setFieldValue(props.name, value),
  setTouched: props => () => props.fieldProps.setFieldTouched(props.name),
  setError: props => message => props.fieldProps.setFieldError(props.name, message)
}

export { getFieldProps, mapFieldPropsToInputProps, inputHandlers, validation }

export default {
  getFieldProps,
  mapFieldPropsToInputProps,
  inputHandlers
}
