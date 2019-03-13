import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as authServices from '../services/auth.services'

interface IProps {
  accessToken: string
}

export default ComposedComponent => {
  class Authentication extends Component<IProps, {}> {
    public render() {
      const isHasToken = authServices.checkHasToken()

      if (!isHasToken) {
        return <Redirect to={'/login'} />
      }

      return <ComposedComponent {...this.props} />
    }
  }

  return Authentication
}
