import * as React from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import './App.css'
import withApiHandleError from './hocs/withApiHandleError.hoc'
import withAppPreLoading from './hocs/withAppPreload.hoc'
import withContextProvider from './hocs/withContextProvider.hoc'
import withDataPreLoad from './hocs/withDataPreLoad.hoc'
import Navigator from './modules/Navigator/Navigator.container'

const App = () => (
  <BrowserRouter>
    <Navigator />
  </BrowserRouter>
)

const enhance = compose(
  withContextProvider,
  withRouter,
  withApiHandleError,
  withDataPreLoad,
  withAppPreLoading
)

export default enhance(App)
