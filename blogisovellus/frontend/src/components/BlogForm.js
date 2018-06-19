import React from 'react'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const BlogForm = ({ onSubmit, handleSubjectChange, handleContentChange, subjectValue, contentValue }) => {
    return (
        <div>
            <h2>Lisää uusi blogi</h2>

            <form onSubmit={onSubmit}>
            <FormGroup controlId="formControlsTextarea">
                <div>
                <ControlLabel>Blogin aihe:</ControlLabel>
                        <FormControl type="text"
                        value={subjectValue}
                        onChange={handleSubjectChange} />
                </div>
                <div>
                <ControlLabel>Blogin sisältö:</ControlLabel>
                        <FormControl style={{height: '400px'}} componentClass="textarea"
                        value={contentValue}
                        onChange={handleContentChange} />
                </div>
                <Button bsStyle="info" type="submit">Lisää uusi</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default BlogForm