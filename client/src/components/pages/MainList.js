import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchItems,fetchUser,addLike,deleteLike} from '../../actions'

class MainList extends React.Component{
    componentDidMount(){
        this.props.fetchItems();
    }

    renderLikes = (item) => {
        if(!this.props.auth){
            return(
                <div>Loading</div>
            )
        } else {
                const likedItem = item.usersLiked === undefined ? <div>Loading...</div> : <div style={{display:'inline', marginTop:"5px",marginRight:"5px",  verticalAlign: "top"}}>{item.usersLiked.length}</div>
                // for(var i = 0; i < item.usersLiked; i++){
                    console.log(item.usersLiked[0] !== this.props.auth._id)
                    if(item.usersLiked[0] !== this.props.auth._id){
                            return(
                                <div onClick={() => this.props.addLike(item._id)} className="secondary-content">
                                    {likedItem}
                                    <i className="material-icons" style={{marginTop:"-2px"}}>star_border</i>
                                </div>
                            )
                    } else {
                            return(
                                <div onClick={() => this.props.deleteLike(item._id)} className="secondary-content">
                                    {likedItem}
                                    <i className="material-icons" style={{marginTop:"-2px"}}>grade</i>
                                </div>
                            )
                        }
                                       
        }
    }


    renderItems = () => {
        if(!this.props.item || this.props.auth === null){
            return(
                <div>Loading...</div>
            )
        } else {
            return this.props.item.map(item => {

                if(this.props.auth.twitterId === item.twitterId && item.itemQty > 0){

                    return(
                        <li key={item._id} className="collection-item">
                            <div className="secondary-content">
                                <Link to={`/item/edit/${item._id}`} className="waves-effect waves-light btn" style={{marginRight:"10px"}}>Edit</Link>
                                <Link to={`/item/delete/${item._id}`} className="waves-effect waves-light btn modal-trigger" data-trigger="deleteModal">Delete</Link>
                            </div>
                            <b><Link to={`/item/${item._id}`}>{item.itemName}</Link></b>
                            <p>${item.itemPrice}</p>
                            <p>{item.itemDesc}</p>

                        </li>
                    )
                } else if (item.itemQty > 0) {
                    const likedItem = item.usersLiked === undefined ? <div>Loading...</div> : <div style={{display:'inline', marginTop:"5px",marginRight:"5px",  verticalAlign: "top"}}>{item.usersLiked.length}</div>
                        return(
                            <li key={item._id} className="collection-item">
                                {/* <div onClick={() => this.props.addLike(item._id)} className="secondary-content">
                                        {likedItem}
                                    <i className="material-icons" style={{marginTop:"-2px"}}>grade</i>
                                </div> */}
                                {this.renderLikes(item)}
                                {/* {likedItem} */}
                                <b><Link to={`/item/${item._id}`}>{item.itemName}</Link></b>
                                <p>${item.itemPrice}</p>
                                <p>{item.itemDesc}</p>
        
                            </li>
                        ) 
                }
            })
        }
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <div style={{margin:"0 auto"}}>
                    <h3>All Items</h3>
                </div>
                <ul className="collection">
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        item: Object.values(state.item),
        auth: state.auth
    }
}

export default connect(mapStateToProps,{
    fetchItems,
    addLike,
    deleteLike
})(MainList)