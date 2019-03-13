import { withProps } from 'recompose'

import * as authServices from '../services/auth.services'

const callback = props => ({
  dataPreLoad: () => {
    const isDontHasToken = authServices.checkHasToken()

    if (!isDontHasToken) return props.history.push('/login')
  }
})

export default withProps(callback)
