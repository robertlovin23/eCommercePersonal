import React from 'react'
import {Link} from 'react-router-dom'
import Modals from '../layout/Modal'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchItem,deleteItem} from '../../actions'

class DeleteItem extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    // renderModalButtons = () => {
    //     return(
    //         <React.Fragment>
    //             <Button color="primary" onClick={() => this.deleteItem(this.props.match.params.id)}>Delete Item</Button>
    //             <Link to={"/"} className="waves-effect waves-light btn">Cancel</Link>
    //         </React.Fragment>
    //     )
    // }
    render(){

        return(
                <Dialog
                        open={this.props.openModal}
                        onClose={this.props.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Would you like to delete this item?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color="primary">
                                Go Back
                            </Button>
                            <Button onClick={() => this.props.deleteItem(this.props.match.params)} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
        )
    }
}

export default connect(null,{
    deleteItem,
    fetchItem
})(DeleteItem)