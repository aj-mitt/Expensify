import React from 'react'
import {shallow} from 'enzyme'
import {SpendingSummary} from '../../components/SpendingSummary'

test('Should test render spending summary with 1 spending', () => {
  const wrapper = shallow(<SpendingSummary spendingCount={1} spendingTotal={235} />)
  expect(wrapper).toMatchSnapshot()
})

test('Should test render spending summary with multiply spending', () => {
  const wrapper = shallow(<SpendingSummary spendingCount={23} spendingTotal={23597796167} />)
  expect(wrapper).toMatchSnapshot()
})
