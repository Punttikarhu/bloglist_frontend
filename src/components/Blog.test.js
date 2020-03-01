import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('Default shows title and author', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 10
  }

  const component = render (
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).not.toHaveTextContent('test url')
  expect(component.container).not.toHaveTextContent('10')
})

test('After clicking shows title, author, url and likes', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'test url',
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} onClick={mockHandler} />
  )

  const button = component.container.querySelector('.blog')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test blog')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).toHaveTextContent('test url')
  expect(component.container).toHaveTextContent('10')
})