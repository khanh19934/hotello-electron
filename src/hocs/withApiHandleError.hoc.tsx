import { History } from 'history'
import { identity } from 'ramda'
import React from 'react'

import api from '../services/axiosApi'
import { clearAccessToken } from '../storage/app.storage'

interface IProps {
  history: History
}

export default (Comp: any) =>
  class ComponentWrapper extends React.Component<IProps, any> {
    constructor(props) {
      super(props)
      this.apiResponseInterceptor = api.interceptors.response.use(this.handleAxiosResponse, this.handleAxiosError)
    }

    public apiResponseInterceptor = -1

    public componentWillUnmount() {
      if (this.apiResponseInterceptor > 0) {
        api.interceptors.response.eject(this.apiResponseInterceptor)
        this.apiResponseInterceptor = -1
      }
    }

    public handleAxiosResponse = identity

    public handleAxiosError = err => {
      if (err.status === 401) {
        clearAccessToken()
        this.props.history.push('/login')
      }

      throw err
    }

    public render() {
      return <Comp {...this.props} />
    }
  }
