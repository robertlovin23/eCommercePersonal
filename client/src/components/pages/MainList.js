import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import DeleteItem from '../pages/DeleteItem'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Container, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, IconButton, Typography, Dialog, DialogContentText, DialogContent,DialogTitle,DialogActions } from '@material-ui/core'
import {fetchItems,fetchUser,addLike,deleteLike,deleteFromCart,deleteItem} from '../../actions'

class MainList extends React.Component{
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
        this.props.fetchItems();
        console.log(this.props)
    
    }

    renderLikes = (item) => {
        const likedItem = item.usersLiked === undefined ? <div>Loading...</div> : <div style={{display:'inline',marginRight:"5px",  verticalAlign: "top"}}>{item.usersLiked.length}</div>
        // for(var i = 0; i < item.usersLiked; i++){
            console.log(item.usersLiked[0] !== this.props.auth._id)
            if(item.usersLiked[0] !== this.props.auth._id){
                    return(
                        <CardActions onClick={() => this.props.addLike(item._id)}>
                            {likedItem}
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon style={{marginTop:"-2px"}}/>
                            </IconButton>
                        </CardActions>
                    )
            } else {
                    return(
                        <CardActions onClick={() => this.props.deleteLike(item._id)}>
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
                        <Grid key={item._id} item lg={4} md={6} sm={8} xs={12}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia image={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                        <CardContent>
                                            <Link to={`/item/${item._id}`} style={{textDecoration:"none", color:"black"}}>
                                                <Typography variant="h4">
                                                    {item.itemName}
                                                </Typography> 
                                            </Link>
                                            <Typography variant="subtitle1">
                                                ${item.itemPrice}
                                            </Typography>
                                            <Typography variant="body1">
                                                {item.itemDesc}
                                            </Typography>

                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant="outlined" color="primary" component={Link} to={`/item/edit/${item._id}`}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="secondary" component={Link} onClick={this.handleOpen}>
                                        Delete
                                    </Button>
                                        {/* <DeleteItem openModal={this.state.openModal} handleClose={this.handleClose}/> */}
                                        <Dialog
                                            open={this.state.openModal}
                                            onClose={this.handleClose}
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
                                                <Button onClick={this.handleClose} color="primary">
                                                    Go Back
                                                </Button>
                                                <Button onClick={() => this.props.deleteItem(item._id)} color="primary" autoFocus>
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                } else if (item.itemQty > 0) {
                        return(
                            <Grid key={item._id} item lg={4} md={6} sm={8} xs={12}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia image={`data:image/jpeg;base64,${base64}`} style={{height:"250px"}}/>
                                        <CardContent>
                                            <Link to={`/item/${item._id}`} style={{textDecoration:"none", color:"black"}}>
                                                <Typography variant="h4">
                                                    {item.itemName}
                                                </Typography> 
                                            </Link>
                                            {this.renderLikes(item)}
                                            <Typography variant="subtitle1">
                                                ${item.itemPrice}
                                            </Typography>
                                            <Typography variant="body1">
                                                {item.itemDesc}
                                            </Typography>
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
                    <Typography variant="h3" style={{marginTop:"10px", marginBottom:"10px"}}>All Items</Typography>
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
    deleteLike,
    deleteItem,
    deleteFromCart,
})(MainList)