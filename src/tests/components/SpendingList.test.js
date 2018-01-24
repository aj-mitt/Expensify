import React from 'react'
import { shallow } from 'enzyme'
import { SpendingList } from '../../components/SpendingList'
import spending from '../fixtures/spending'

test('Should render Spending list with spending', () => {
  const wrapper = shallow(<SpendingList spending={spending}/>)
  expect(wrapper).toMatchSnapshot()
})

test('Should render Spending list with empty array', () => {
  const wrapper = shallow(<SpendingList spending={[]}/>)
  expect(wrapper).toMatchSnapshot()
})
