import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const UpdateBlogForm = ({
  match,
  onSubmit,
  handleContentChange,
  contentValue,
  updateBlog,
  blog,
  history
}) => {
  if (contentValue === '')
    handleContentChange({ target: { value: blog.content } })
  return (
    <div>
      <h2>Muokkaa blogia "{blog.subject}"</h2>

      <form
        onSubmit={event => {
          event.preventDefault()
          updateBlog(match.params.id)
          history.push('/blogs')
        }}
      >
        <FormGroup controlId="formControlsTextarea">
          <div>
            <ControlLabel>Blogin uusi sisältö:</ControlLabel>
            <FormControl
              style={{ height: '400px' }}
              componentClass="textarea"
              value={contentValue}
              onChange={handleContentChange}
            />
          </div>
          <Button bsStyle="info" type="submit">
            Tallenna muutokset
          </Button>
        </FormGroup>
      </form>
      <div />
    </div>
  )
}

export default UpdateBlogForm
