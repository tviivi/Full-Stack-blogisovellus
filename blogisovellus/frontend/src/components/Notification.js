import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
    if (message === null) {
        return (
            <Alert bsStyle="primary"> </Alert>
        )
    }
    return (
        <Alert bsStyle="info">
            {message}
        </Alert>
    )
}

export default Notification