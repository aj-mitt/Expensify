import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {startLogout} from '../actions/auth'

export const Header = ({startLogout}) => (
  <header>
    <h1>Spend Track</h1>
    <NavLink to='/dashborad' activeClassName='is-active'>Home</NavLink>
    <NavLink to='/create' activeClassName='is-active'>Create Spend</NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
)
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
