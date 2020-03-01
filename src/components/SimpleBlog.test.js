import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


// ($env:CI = "true") -and (npm test)

afterEach(cleanup)

test('component renders title', () => {
  const blog = {
    title: 'testing title'
  }

  const component = render (
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent('testing title')
})

test('component renders author', () => {
  const blog = {
    author: 'testing author'
  }

  const component = render (
    <SimpleBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('testing author')
})

test('component renders likes', () => {
  const blog = {
    likes: 10
  }

  const component = render (
    <SimpleBlog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('10')
})

describe('button:', async () => {
  test('clicking like button twice calls event handler twice', () => {
    const blog = {}

    const mockHandler = jest.fn()

    const { getByText } = render (
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})