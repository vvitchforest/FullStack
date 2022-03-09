import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Blog form test', () => {
  const createNewBlog = jest.fn()

  render(<BlogForm createNewBlog={createNewBlog} />)
  screen.debug()

  const titleInput = screen.getByTestId('input-title')
  const authorInput = screen.getByTestId('input-author')
  const urlInput = screen.getByTestId('input-url')
  const submitBtn = screen.getByText('add blog')

  userEvent.type(titleInput, 'testing blog form')
  userEvent.type(authorInput, 'jokuvaan')
  userEvent.type(urlInput, 'www')
  userEvent.click(submitBtn)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  console.log(createNewBlog.mock.calls[0][0])
  expect(createNewBlog.mock.calls[0][0]).toEqual({
    title: 'testing blog form',
    author: 'jokuvaan',
    url: 'www'
  })
})