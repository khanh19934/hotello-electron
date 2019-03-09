import { compose, mapProps, pure, withHandlers } from 'recompose'

import { inputHandlers, mapFieldPropsToInputProps } from '../utils/form.util'

const mapOwnProps = ({ name, fieldProps, ...rest }) => ({
  ...mapFieldPropsToInputProps(name, fieldProps),
  ...rest
})

const withFlatFieldProps = compose(
  withHandlers(inputHandlers),
  mapProps(mapOwnProps),
  pure
)

export { mapOwnProps }
export default withFlatFieldProps
