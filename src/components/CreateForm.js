import React from 'react'

const CreateForm = ({ handleCreate, title, setTitle, author, setAuthor, url, SetUrl }) => (
  <form onSubmit={handleCreate}>
    <div>
      title
      <input
        type='text'
        value={title}
        name='title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
    author
      <input
        type='text'
        value={author}
        name='author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
    url
      <input
        type='text'
        value={url}
        name='url'
        onChange={({ target }) => SetUrl(target.value)}
      />
    </div>
    <button type="submit">Create blog</button>
  </form>
)

export default CreateForm