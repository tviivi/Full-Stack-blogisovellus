import React from 'react'
import { FormGroup, Button } from 'react-bootstrap'

const LogoutForm = ({ handleSubmit }) => {
    return (
        <div>
            <center><h3>Haluatko varmasti kirjautua ulos sovelluksesta?</h3></center>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <center><Button bsStyle="info" type="submit">Kirjaudu ulos</Button></center>
                </FormGroup>
            </form>
            <div className="media-left">
                <img className="media-object" width={1140} height={600} src="http://ichef.bbci.co.uk/wwfeatures/wm/live/1280_640/images/live/p0/5j/pm/p05jpmyf.jpg"
                    alt="Responsive"></img>
            </div>
        </div>
    )
}

export default LogoutForm