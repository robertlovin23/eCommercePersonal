import React from 'react'
import {Typography, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import ReactDOM from 'react-dom'


const Modals = (props) => {
    console.log(props)
    return ReactDOM.createPortal(
        <div>
            <div>
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {props.actions}
                </DialogActions>
            </div>
        </div>,document.querySelector("#modal")
    )
}

export default Modals