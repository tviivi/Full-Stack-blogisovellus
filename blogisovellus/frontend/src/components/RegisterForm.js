import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const RegisterForm = ({ onSubmit, handleNameChange, handleUsernameChange, handlePasswordChange, nameValue, usernameValue, passwordValue }) => {
    return (
        <div>
            <h2>Rekisteröidy BLOGIZIin</h2>

            <form onSubmit={onSubmit}>
                <FormGroup controlId="formControlsTextarea2">
                    <div>
                        <ControlLabel>Nimi:</ControlLabel>
                        <FormControl type="text"
                            value={nameValue}
                            onChange={handleNameChange} />
                    </div>
                    <div>
                        <ControlLabel>Käyttäjänimi:</ControlLabel>
                        <FormControl type="text"
                            value={usernameValue}
                            onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <ControlLabel>Salasana:</ControlLabel>
                        <FormControl type="password"
                            value={passwordValue}
                            onChange={handlePasswordChange} />
                    </div>
                    <Button bsStyle="info" type="submit">Rekisteröidy</Button>
                </FormGroup>
            </form>
        </div>
    )
}

export default RegisterForm