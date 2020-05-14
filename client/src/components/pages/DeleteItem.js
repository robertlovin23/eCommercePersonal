import React from 'react'
import {Link} from 'react-router-dom'
import Modal from '../layout/Modal'

import {connect} from 'react-redux'
import {fetchItem,deleteItem} from '../../actions'

class DeleteItem extends React.Component{

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    renderModalButtons = () => {
        return(
            <React.Fragment>
                <button className="waves-effect waves-light btn" onClick={this.props.deleteItem(this.props.match.params.id)}>Delete Item</button>
                <Link to={"/"} className="waves-effect waves-light btn">Cancel</Link>
            </React.Fragment>
        )
    }
    render(){
        return(
            <div>
                <h3>Delete Item</h3>
                <Modal 
                    title="Delete Item"
                    description="Would you like to delete this item?"
                    actions={this.renderModalButtons()}
                />
            </div>
        )
    }
}

export default connect(null,{
    deleteItem,
    fetchItem
})(DeleteItem)