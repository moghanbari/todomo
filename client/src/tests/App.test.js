import React from 'react'
import { render } from '@testing-library/react'
import App from '../App'

test('Check for todomo text in landing page', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/todomo/i)
  expect(linkElement).toBeInTheDocument()
})
