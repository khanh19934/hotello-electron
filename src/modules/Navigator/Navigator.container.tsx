import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import withCheckAuthentication from '../../hocs/withCheckAuthentication.hoc'
import Pages from './Navigator.page'
import Routes from './Navigator.route'

const Navigator = () => (
  <Switch>
    <Route exact={true} path={Routes.Home} component={withCheckAuthentication(Pages.Home)} />
    <Route exact={true} path={Routes.Login} component={Pages.Login} />
    <Route exact={true} path={Routes.Register} component={Pages.Register} />
  </Switch>
)

export default Navigator
