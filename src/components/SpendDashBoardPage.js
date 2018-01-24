import React from 'react'
import SpendingList from './SpendingList'
import SpendingListFilters from './SpendingListFilters'
import SpendingSummary from './SpendingSummary'

const SpendDashboardPage = () => (
  <div>
    <SpendingSummary />
    <SpendingListFilters />
    <SpendingList />
  </div>

)

export default SpendDashboardPage
