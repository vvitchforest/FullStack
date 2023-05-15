import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe(' Blog component', () => {
  let component
  let updateBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'irina',
      url: 'www',
      likes: 5,
      user: { username: 'lol' }
    }

    const user = {
      username: 'lol'
    }
    component = render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={() => {}} user={user}/>).container
    screen.debug()
  })

  // 5.13
  test('at start renders title and author and not url and likes', () => {
    screen.getByText('Component testing', { exact: false })
    screen.getByText('irina')

    const likes = screen.queryByText('5')
    expect(likes).toBeNull()

    const url = screen.queryByText('www')
    expect(url).toBeNull()
  })

  // 5.14
  test('renders url and likes when button is clicked', async () => {
    const user = userEvent.setup()
    const btn = screen.getByText('view')

    await user.click(btn)

    screen.getByText('5', { exact: false })
    screen.getByText('www')
    screen.getByText('irina')

  })

  // 5.15
  test('event handler is called twice if like button is clicked twice,', async () => {
    const user = userEvent.setup()
    const showBtn = screen.getByText('view')

    await user.click(showBtn)

    const likeBtn = component.querySelector('#like-btn')

    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})




