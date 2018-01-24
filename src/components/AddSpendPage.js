import React from 'react'
import {connect} from 'react-redux'
import SpendingForm from './SpendingForm'
import {startAddSpending} from '../actions/spending'

export class AddSpendPage extends React.Component {
  onSubmit = (spending) => {
    this.props.startAddSpending(spending)
    this.props.history.push('/')
  }
  render() {
    return(
      <div>
      <h1>Add Spending</h1>
      <SpendingForm
        onSubmit={this.onSubmit}
      />
    </div>
      
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddSpending: (spending) => dispatch(startAddSpending(spending))
})

export default connect(undefined, mapDispatchToProps)(AddSpendPage)
