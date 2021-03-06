import React from 'react'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Glyphicon
} from 'react-bootstrap'

const BlogForm = ({
  match,
  category,
  categories,
  handleSubjectChange,
  handleContentChange,
  handleCategoryChange,
  categoryValue,
  subjectValue,
  contentValue,
  history,
  addBlog,
  notify
}) => {
  const onSubmit = event => {
    event.preventDefault()
    if (subjectValue === '' || contentValue === '') {
      notify(`Syötä blogille otsikko ja sisältö`)
      return
    }
    addBlog()
    history.push('/blogs')
  }

  return (
    <div className="bg-img">
      <h2>Lisää uusi blogi</h2>
      <form onSubmit={onSubmit}>
        <FormGroup controlId="formControlsTextarea">
          <div>
            <ControlLabel>Blogin aihe:</ControlLabel>
            <FormControl
              type="text"
              placeholder="Blogin aihe"
              value={subjectValue}
              onChange={handleSubjectChange}
            />
          </div>
          <div>
            <ControlLabel>Blogin sisältö:</ControlLabel>
            <FormControl
              style={{ height: '150px' }}
              componentClass="textarea"
              placeholder="Blogin sisältö"
              value={contentValue}
              onChange={handleContentChange}
            />
          </div>
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <div>
            <div>
              <ControlLabel>Kategoria:</ControlLabel>
            </div>
            <FormControl
              componentClass="select"
              placeholder="Kategoria"
              value={categoryValue}
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.content}
                </option>
              ))}
            </FormControl>
          </div>
        </FormGroup>
        <Button bsStyle="primary" type="submit">
          <Glyphicon glyph="pencil" /> Lisää uusi
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
