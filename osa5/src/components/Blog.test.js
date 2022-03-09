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
    component = render(<Blog blog={blog} updateBlog={updateBlog} user={user}/>).container
    screen.debug()
  })

  test('at start renders title and author and not url and likes', () => {
    screen.getByText('Component testing', { exact: false })
    screen.getByText('irina')

    const likes = screen.queryByText('5')
    expect(likes).toBeNull()

    const url = screen.queryByText('www')
    expect(url).toBeNull()
  })

  test('renders url and likes when button is clicked', () => {
    const btn = screen.getByText('view')
    userEvent.click(btn)

    const div = component.querySelector('.blog-extended-info')
    expect(div).toHaveTextContent('5')
    expect(div).toHaveTextContent('www')
  })

  test('event handler is called twice if like button is clicked twice,', () => {
    const showBtn = screen.getByText('view')
    userEvent.click(showBtn)

    const likeBtn = component.querySelector('#like-btn')
    userEvent.click(likeBtn)
    userEvent.click(likeBtn)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})




