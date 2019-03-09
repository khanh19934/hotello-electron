import { isNilOrEmpty } from 'ramda-adjunct'

// tslint:disable-next-line:no-any
const requireValue = (value: any) => {
  if (isNilOrEmpty(value)) {
    return false
  }

  return true
}

export default requireValue
