import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import UserContainer from "./components/UserContainer";
import { currentUser } from './actions/users'
import { withRouter } from 'react-router-dom'

import Home from './components/Home'

class App extends Component {

componentDidMount(){
    const token = localStorage.getItem('token')

    if (!token) {
      this.props.history.push('/home')
    } else {

      const reqObj = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      }

      
      fetch('https://langlingo.herokuapp.com/users/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => {
          this.props.currentUser(user)
          this.props.history.push(`/dashboard/${user.id}`)
      })

      }

}

  render (){

    return (
      <div className="ui container">
            <h4>LANGLINGO</h4>
            <div className="ui divider"></div>

          <Switch>
            <Route path="/home" component={Home} />
            <Route  path="*" render={() => {
                  return ( this.props.user ? <Route path="/dashboard/:id" component={UserContainer} /> : <Redirect to='/home' />)
              }} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      game: state.game
  }
}
const mapDispatchToProps = {
  currentUser
}
      
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
      
      