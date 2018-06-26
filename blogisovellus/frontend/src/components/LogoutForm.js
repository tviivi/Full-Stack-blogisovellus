import React from 'react'
import { FormGroup, Button } from 'react-bootstrap'

const LogoutForm = ({ handleSubmit }) => {
    return (
        <div>
            <h3>Haluatko varmasti kirjautua ulos sovelluksesta?</h3>
            <form onSubmit={handleSubmit}>
            <FormGroup>
                <Button bsStyle="info" type="submit">Kirjaudu ulos</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default LogoutForm