import React from 'react';
import {fetchUser,fetchItems} from '../actions';
import {connect} from 'react-redux';
import MainList from './pages/MainList';
import FetchItem from './pages/ItemDetail';
import CartList from './pages/CartList';
import UserProfile from './pages/UserProfile';
import NewItem from './pages/NewItem';
import EditItem from './pages/EditItem';
import DeleteItem from './pages/DeleteItem';
import Header from './layout/header';
import history from './history'
import {BrowserRouter,Route,Switch, Router} from 'react-router-dom'

class App extends React.Component{

  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
      <div className="container">
        <Router history={history}>
          <Header/>
            <Switch>
              <Route path="/" exact component={MainList}/>
              <Route path="/cart/:id" exact component={CartList}/>
              <Route path="/items/new"  exact component={NewItem}/>
              <Route path="/item/:id" exact component={FetchItem}/>
              <Route path="/item/edit/:id" exact component={EditItem}/>
              <Route path="/item/delete/:id" exact component={DeleteItem}/>
              <Route path="/profile/:id" exact component={UserProfile}/>
            </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth,
    item: state.item
  }
};

export default connect(mapStateToProps,{
  fetchUser,
  fetchItems
})(App);
