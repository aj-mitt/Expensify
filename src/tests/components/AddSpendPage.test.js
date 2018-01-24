import React from 'react'
import {shallow} from 'enzyme'
import {AddSpendPage} from '../../components/AddSpendPage'
import spending from '../fixtures/spending'

let startAddSpending, history, wrapper

beforeEach(() => {
  startAddSpending= jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(<AddSpendPage startAddSpending={startAddSpending} history={history} />)
})

test('Should render Add spend', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should handle onSubmit', () => {
  wrapper.find('SpendingForm').prop('onSubmit')(spending[1])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startAddSpending).toHaveBeenLastCalledWith(spending[1])
})
