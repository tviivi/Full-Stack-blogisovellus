import React from 'react'
import PropTypes from 'prop-types'
import { Table, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password, onLogin, history }) => {
    return (
        <div>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={handleSubmit}>
            <FormGroup>
                <div>
                <ControlLabel>Käyttäjätunnus:</ControlLabel>
            <FormControl
                        value={username}
                        onChange={handleChange}
                        name="username"
                    />
                </div>
                <div>
                <ControlLabel>Salasana:</ControlLabel>
            <FormControl
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <Button bsStyle="info" type="submit">Kirjaudu</Button>
                </FormGroup>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm