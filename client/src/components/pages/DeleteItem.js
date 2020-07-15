import React from 'react'
import {Link} from 'react-router-dom'
import Modals from '../layout/Modal'
import {Modal} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchItem,deleteItem} from '../../actions'

class DeleteItem extends React.Component{
    state = {
        openModal: false
    }

    handleOpen = () => {
        this.setState({
            openModal: true
        })
    }

    handleClose = () => {
        this.setState({
            openModal: false
        })
    }

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    renderModalButtons = () => {
        return(
            <React.Fragment>
                <button className="waves-effect waves-light btn" onClick={() => this.deleteItem(this.props.match.params.id)}>Delete Item</button>
                <Link to={"/"} className="waves-effect waves-light btn">Cancel</Link>
            </React.Fragment>
        )
    }
    render(){
        return(
            <div>
                <h3>Delete Item</h3>
                <Modal 
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="delete-modal-title"

                >
                    {<Modals 
                        title="Delete Item"
                        description="Would you like to delete this item?"
                        actions={this.renderModalButtons()}
                    />}
                </Modal>
            </div>
        )
    }
}

export default connect(null,{
    deleteItem,
    fetchItem
})(DeleteItem)