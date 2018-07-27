import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RegisterForm = ({ notify, history, addUser, handleNameChange, handleUsernameChange, handlePasswordChange, nameValue, usernameValue, passwordValue }) => {
    const onSubmit = (event) => {
        event.preventDefault()
        if (nameValue === "" || usernameValue === "" || passwordValue === "") {
            notify(`Syötä kaikki pyydetyt käyttäjätiedot`)
            return
        }
        addUser(event)
        history.push('/login')
    }
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
                    <Button bsStyle="info" type="submit" ><Glyphicon glyph="plus sign" /> Rekisteröidy</Button>
                </FormGroup>
            </form>
            <h4>Oletko jo käyttäjä? Kirjaudu sisään <Link to="/login">tästä!</Link></h4>
        </div>
    )
}

export default RegisterForm