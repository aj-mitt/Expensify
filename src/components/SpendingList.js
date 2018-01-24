import React from 'react'
import {connect} from 'react-redux'
import SpendingListItem from './SpendingListItem'
import selectSpending from '../selectors/spending'

export const SpendingList = (props) => (
  <div>
    {
      props.spending.length === 0 ? (
        <p> No Spending</p>
      ) : (
        props.spending.map((spending) => {
          return <SpendingListItem key={spending.id} {...spending}/>
        })
      )
    }
  </div>
)

const mapStateToProps = (state) => {
  return {
    spending: selectSpending(state.spending, state.filters)
  }
}

export default connect(mapStateToProps)(SpendingList)
