import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchItems,fetchUser,addLike,deleteLike} from '../../actions'

class MainList extends React.Component{
    componentDidMount(){
        this.props.fetchItems();
    }

    renderLikes = (item) => {
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


    renderItems = () => {
        if(!this.props.item || this.props.auth === null){
            return(
                <div>Loading...</div>
            )
        } else {
            return this.props.item.map(item => {
               if(item.itemImg !== undefined){
                const base64 = Buffer.from(item.itemImg).toString('base64')
                console.log(base64)

                if(this.props.auth.twitterId === item.twitterId && item.itemQty > 0 && base64){
                    return(
                        <div key={item._id} className="col m4 s12">
                            <div className="card">
                                <div className="card-image">
                                    <img src={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                    <span className="card-title"><Link to={`/item/${item._id}`}>{item.itemName}</Link></span>
                                </div>
                                <div className="card-content">
                                    <p>${item.itemPrice}</p>
                                    <p>{item.itemDesc}</p>
                                </div>
                                <div className="card-action">
                                    <Link to={`/item/edit/${item._id}`} className="waves-effect waves-light btn" style={{marginRight:"10px"}}>Edit</Link>
                                    <Link to={`/item/delete/${item._id}`} className="waves-effect waves-light btn modal-trigger" data-trigger="deleteModal">Delete</Link>
                                </div>
                            </div>
                        </div>
                    )
                } else if (item.itemQty > 0) {
                        return(
                            <div key={item._id} className="col m4 s12">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                        <span className="card-title"><Link to={`/item/${item._id}`}>{item.itemName}</Link></span>
                                    </div>
                                    <div className="card-content">
                                        {this.renderLikes(item)}
                                        <p>${item.itemPrice}</p>
                                        <p>{item.itemDesc}</p>

                                    </div>
                                </div>
                            </div>
                        ) 
                    }
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
                <div className="row">
                    {this.renderItems()}
                </div>
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