import React, { useState } from 'react'
import blogsService from '../services/blogs'



const Blog = ({ blog }) => {
  const [ clicked, setClicked ] = useState(false)

  const blogStyle = {
    paddingTop: 0,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const id = blog.id
    const newBlog = {
      'user': blog.user.id,
      'likes': blog.likes + 1,
      'author': blog.author,
      'title': blog.title,
      'url': blog.url
    }
    blogsService
      .update(id, newBlog)
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} ?`)

    if (ok) {
      const id = blog.id
      blogsService
        .del(id)
    }
  }

  if(clicked) {
    return(
      <div style={blogStyle} onClick={() => setClicked(false)}>
        {blog.title} <br/>
        {blog.url}<br/>
        {blog.likes + ' likes '}<button onClick={handleLike}>like</button><br/>
        {'Added by ' + blog.author} <br/>
        <button onClick={handleRemove}>remove</button>
      </div>
    )
  }

  return(
    <div style={blogStyle} onClick={() => setClicked(true)} className='blog'>
      {blog.title} {blog.author}
    </div>
  )
}

export default Blog