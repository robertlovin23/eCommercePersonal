import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, IconButton } from '@material-ui/core'
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
                        <CardActions onClick={() => this.props.addLike(item._id)} className="secondary-content">
                            {likedItem}
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon style={{marginTop:"-2px"}}/>
                            </IconButton>
                        </CardActions>
                    )
            } else {
                    return(
                        <CardActions onClick={() => this.props.deleteLike(item._id)} className="secondary-content">
                            {likedItem}
                            <IconButton aria-label="delete from favorites">
                                <FavoriteIcon style={{marginTop:"-2px"}}/>
                            </IconButton>
                        </CardActions>
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
                        <Grid key={item._id} item xs={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia image={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                        <CardContent>
                                            <Link to={`/item/${item._id}`} style={{textDecoration:"none", color:"black"}}>
                                                {item.itemName}
                                            </Link>
                                            <p>${item.itemPrice}</p>
                                            <p>{item.itemDesc}</p>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to={`/item/edit/${item._id}`} className="waves-effect waves-light btn" style={{marginRight:"10px"}}>Edit</Link>
                                    <Link to={`/item/delete/${item._id}`} className="waves-effect waves-light btn modal-trigger" data-trigger="deleteModal">Delete</Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                } else if (item.itemQty > 0) {
                        return(
                            <Grid key={item._id} item xs={4}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia image={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                    <CardContent>
                                        <Link to={`/item/${item._id}`} style={{textDecoration:"none", color:"black"}}>
                                            {item.itemName}
                                        </Link>
                                        {this.renderLikes(item)}
                                        <p>${item.itemPrice}</p>
                                        <p>{item.itemDesc}</p>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
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
                <Grid container spacing={3}>
                    {this.renderItems()}
                </Grid>
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