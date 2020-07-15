import React from 'react'
import {Link} from 'react-router-dom'
import Modals from '../layout/Modal'
import { Dialog,Button} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchItem,deleteItem} from '../../actions'

class DeleteItem extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    renderModalButtons = () => {
        return(
            <React.Fragment>
                <Button color="primary" onClick={() => this.deleteItem(this.props.match.params.id)}>Delete Item</Button>
                <Link to={"/"} className="waves-effect waves-light btn">Cancel</Link>
            </React.Fragment>
        )
    }
    render(){

        return(
            <div>
                <h3>Delete Item</h3>
                <Dialog
                    open={this.state.openModal}
                    onClose={this.handleClose}
                    aria-labelledby="delete-modal-title"
                >
                    <Modals title="Delete Item" 
                            description="Would you like to delete this item?" 
                            actions={this.renderModalButtons()}
                    />
                </Dialog>
            </div>
        )
    }
}

export default connect(null,{
    deleteItem,
    fetchItem
})(DeleteItem)