import React from 'react'
import {shallow} from 'enzyme'
import SpendDashBoardPage from '../../components/SpendDashBoardPage'

test('Should render spend dashboard', () => {
  const wrapper = shallow(<SpendDashBoardPage />)
  expect(wrapper).toMatchSnapshot()
})
