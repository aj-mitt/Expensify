import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import selectSpending from '../selectors/spending'
import selectSpendingTotal from '../selectors/spending-total'

export const SpendingSummary = ({spendingCount, spendingTotal}) => {
  const spendingWord = spendingCount === 1 ? 'spending' : 'spending'
  const formattedSpendingTotal = numeral(spendingTotal / 100).format('$0,0.00')
  return (
    <div>
      <h1>Viewing {spendingCount} {spendingWord} total  of {formattedSpendingTotal}</h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  const visibleSpending = selectSpending(state.spending, state.filters)

  return {
    spendingCount: visibleSpending.length,
    spendingTotal: selectSpendingTotal(visibleSpending)
  }
}

export default connect(mapStateToProps)(SpendingSummary)