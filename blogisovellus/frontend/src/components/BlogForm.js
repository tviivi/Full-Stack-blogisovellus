import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogForm = ({ onSubmit, handleSubjectChange, handleContentChange, subjectValue, contentValue }) => {
    return (
        <div>
            <h2>Lisää uusi blogi</h2>

            
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
                    <Button bsStyle="info" type="submit">Lisää uusi</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default BlogForm