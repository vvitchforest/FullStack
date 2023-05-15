import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

// 5.16
describe('BlogForm component', () => {

  test('Blog form test',  async () => {
    const createNewBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createNewBlog={createNewBlog} />)
    screen.debug()

    const titleInput = screen.getByTestId('input-title')
    const authorInput = screen.getByTestId('input-author')
    const urlInput = screen.getByTestId('input-url')
    const submitBtn = screen.getByText('add blog')

    await user.type(titleInput, 'testing blog form')
    await user.type(authorInput, 'jokuvaan')
    await user.type(urlInput, 'www')
    await user.click(submitBtn)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0]).toEqual({
      title: 'testing blog form',
      author: 'jokuvaan',
      url: 'www'
    })
  })
})