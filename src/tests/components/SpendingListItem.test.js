import React from 'react'
import { shallow } from 'enzyme'
import spending from '../fixtures/spending'
import SpendingListItem from '../../components/SpendingListItem'

test('Should render SpendingListItem', () => {
  const wrapper = shallow(<SpendingListItem {...spending[0]}/>)
  expect(wrapper).toMatchSnapshot()
})
