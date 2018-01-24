import React from 'react'
import {shallow} from 'enzyme'
import moment from 'moment'
import SpendingForm from '../../components/SpendingForm'
import spending from '../fixtures/spending'

test('Should render spending form', () => {
  const wrapper = shallow(<SpendingForm />)
  expect(wrapper).toMatchSnapshot()
})

test('Should render spending form with data', () => {
  const wrapper = shallow(<SpendingForm spending={spending[1]} />)
  expect(wrapper).toMatchSnapshot()
})

test('Should render error for submit', () => {
  const wrapper = shallow(<SpendingForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('Should check description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<SpendingForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('description')).toBe(value)
})

test('Should check note on textarea change', () => {
  const value = 'New note'
  const wrapper =shallow(<SpendingForm />)
  wrapper.find('textarea').simulate('change', {
    target: {value}
  })
  expect(wrapper.state('note')).toBe(value)
})

test('Should check amount valid input', () => {
  const value = '23.50'
  const wrapper = shallow(<SpendingForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('Should check amount invalid input', () => {
  const value = '12.122'
  const wrapper = shallow(<SpendingForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: {value}
  })
  expect(wrapper.state('amount')).toBe('')
})

test('Should call onsubmit prop for valid form', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<SpendingForm  spending={spending[0]} onSubmit={onSubmitSpy}/>)
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: spending[0].description,
    amount: spending[0].amount,
    note: spending[0].note,
    createdAt: spending[0].createdAt
  })
})

test('Should check the new date', () => {
  const now = moment()
  const wrapper = shallow(<SpendingForm />)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('Should check calendar focus change', () => {
  const focused = true
  const wrapper = shallow(<SpendingForm />)
  wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
  expect(wrapper.state('calendarFocused')).toBe(focused)
})
