import React from 'react'
import {connect} from 'react-redux'
import SpendingForm from './SpendingForm'
import { startEditSpending, startRemoveSpending } from '../actions/spending';

export class EditSpendPage extends React.Component {
  onSubmit = (spending) => {
    this.props.startEditSpending(this.props.spending.id, spending)
    this.props.history.push('/')
  }
  onRemove = () => {
    this.props.startRemoveSpending({id: this.props.spending.id})
    this.props.history.push('/')
  }
  render(){
    return (
      <div>
        <SpendingForm
          spending={this.props.spending}
          onSubmit= {this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    spending: state.spending.find((spending) => spending.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  startEditSpending: (id, spending) => dispatch(startEditSpending(id, spending)),
  startRemoveSpending: (data) => dispatch(startRemoveSpending(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditSpendPage)
