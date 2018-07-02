import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const UpdateBlogForm = ({ onSubmit, handleSubjectChange, handleContentChange, subjectValue, contentValue, updateBlog, blog }) => {
    return (
        <div>
            <h2>Muokkaa blogia</h2>

            <form onSubmit={onSubmit}>
                <FormGroup controlId="formControlsTextarea">
                    <div>
                        <ControlLabel>Blogin aihe:</ControlLabel>
                        <FormControl type="text" placeholder="Blogin aihe"
                            value={subjectValue}
                            onChange={handleSubjectChange} />
                    </div>
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