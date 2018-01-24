import React from 'react'
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import SpendDashboardPage from '../components/SpendDashBoardPage'
import AddSpendPage from '../components/AddSpendPage'
import EditSpendPage from '../components/EditSpendPage'
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path='/' component={LoginPage} exact={true}/>
        <PrivateRoute paht='/dashboard' component={SpendDashboardPage} />
        <PrivateRoute path='/create' component={AddSpendPage} />
        <PrivateRoute path='/edit/:id' component={EditSpendPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter
