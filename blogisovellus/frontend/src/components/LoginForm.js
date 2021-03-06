import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
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
                <Button bsStyle="info" type="submit"><Glyphicon glyph="play" /> Kirjaudu</Button>
                </FormGroup>
            </form>
            <h4>Etkö ole vielä käyttäjä? Rekisteröidy <Link to="/register">tästä!</Link></h4>
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