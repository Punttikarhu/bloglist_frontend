import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogsService from './services/blogs'

function App() {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  useEffect(() => {
    blogsService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])



  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    // eslint-disable-next-line no-empty
    } catch (exception) {}
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const handleCreate = async event => {
    event.preventDefault()
    console.log('creating blog')

    const newBlog = {
      'title': title,
      'author': author,
      'url': url,
      'likes': 0
    }

    try {
      await blogsService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    // eslint-disable-next-line no-empty
    } catch (exception) {}
    window.location.reload()
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  if (user === null) {
    return(
      <Togglable buttonLabel='login'>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </Togglable>
    )
  }

  return (
    <div>
      {user.name} logged in <button onClick={handleLogout}>log out</button>
      <Togglable buttonLabel='new blog'>
        <CreateForm handleCreate={handleCreate} title={title} setTitle={setTitle}
          author={author} setAuthor={setAuthor} url={url} SetUrl={setUrl}  />
      </Togglable>
      <h3>blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
