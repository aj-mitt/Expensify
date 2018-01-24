import React from 'react'
import {shallow} from 'enzyme'
import spending from '../fixtures/spending'
import {EditSpendPage} from '../../components/EditSpendPage'

let startEditSpending, startRemoveSpending, history, wrapper

beforeEach(() => {
  startEditSpending = jest.fn()
  startRemoveSpending = jest.fn()
  history = {push: jest.fn()}
  wrapper = shallow(
    <EditSpendPage
      startEditSpending={startEditSpending}
      startRemoveSpending={startRemoveSpending}
      history={history}
      spending={spending[2]}
    />
  )
})

test('Should render Edit spend page', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should test handle startEditSpending', () => {
  wrapper.find('SpendingForm').prop('onSubmit')(spending[2])
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startEditSpending).toHaveBeenLastCalledWith(spending[2].id, spending[2])
})

test('Should test handle startRemoveSpending', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenLastCalledWith('/')
  expect(startRemoveSpending).toHaveBeenLastCalledWith({
    id: spending[2].id
  })
})
