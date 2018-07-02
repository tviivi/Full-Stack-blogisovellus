import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const UpdateBlogForm = ({ match, onSubmit, handleSubjectChange, handleContentChange, subjectValue, contentValue, updateBlog, blog }) => {
    return (
        <div>
            <h2>Muokkaa blogia "{blog.subject}"</h2>

            <form onSubmit={(event) => {
                event.preventDefault();
                updateBlog(match.params.id);
            }}>
                <FormGroup controlId="formControlsTextarea">
                    <div>
                        <ControlLabel>Blogin sisältö:</ControlLabel>
                        <FormControl style={{ height: '400px' }} componentClass="textarea" placeholder="Blogin sisältö"
                            value={contentValue}
                            onChange={handleContentChange} />
                    </div>
                    <Button bsStyle="info" type="submit">Tallenna muutokset</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default UpdateBlogForm