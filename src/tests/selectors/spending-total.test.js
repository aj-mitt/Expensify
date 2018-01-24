import selectSpendingTotal from '../../selectors/spending-total'
import spending from '../fixtures/spending'

test('Should test 0 if there is no spendings', () => {
  const res = selectSpendingTotal([])
  expect(res).toBe(0)
})

test('Should test correctly add a single spending', () => {
  const res = selectSpendingTotal([spending[0]])
  expect(res).toBe(195)
})

test('Should test correctly add multiply spending', () => {
  const res = selectSpendingTotal(spending)
  expect(res).toBe(114195)
})
