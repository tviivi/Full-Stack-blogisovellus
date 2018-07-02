import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

const UpdateBlogForm = ({ match, onSubmit, handleContentChange, contentValue, updateBlog, blog }) => {
    return (
        <div>
            <h2>Muokkaa blogia "{blog.subject}"</h2>
            <Alert bsStyle="info">
            <em>{blog.content}</em>
            </Alert>

            <form onSubmit={(event) => {
                event.preventDefault();
                updateBlog(match.params.id);
            }}>
                <FormGroup controlId="formControlsTextarea">
                    <div>
                        <ControlLabel>Blogin uusi sisältö:</ControlLabel>
                        <FormControl style={{ height: '400px' }} componentClass="textarea"
                            value={contentValue}
                            onChange={handleContentChange} />
                    </div>
                    <Button bsStyle="info" type="submit">Tallenna muutokset</Button>
                </FormGroup>
            </form>
            <div>
            </div>
        </div>
    )
}

export default UpdateBlogForm