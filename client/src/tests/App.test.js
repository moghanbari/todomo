import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '../App'

test('Check for todomo text in landing page', () => {
  const { getByText } = render(<App />)
  const header = getByText('Todomo')
  expect(header).toBeInTheDocument()
})
