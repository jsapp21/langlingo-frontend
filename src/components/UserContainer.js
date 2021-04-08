import React, { Component } from 'react'
import Nav from './Nav'
import UserDashboard from './UserDashboard'
import GameSelection from './GameSelection'
import Game from './Game'
import { Route, Switch } from 'react-router-dom'
import Dictionary from './Dictionary'
import { connect } from 'react-redux'
import { wordOfTheDay, imageOfTheDay, date } from '../actions/wod'

class UserContainer extends Component {

    componentDidMount() {

        let num = Math.floor(Math.random() * 101) + 1;  
            let today = new Date()
    
            const date = (today.getMonth() + 1)  + '-' + today.getDate()  + '-' + today.getFullYear()
            this.props.date(date)
            const reqWord = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
    
            fetch(`http://localhost:3000/images/${num}`, reqWord)
            .then(resp => resp.json())
            .then(image => {
                this.props.imageOfTheDay(image)
            })
    
            fetch(`http://localhost:3000/words/${num}`, reqWord)
            .then(resp => resp.json())
            .then(word => { 
              this.props.wordOfTheDay(word)
            })

    }

    render() {
        return(
            <div>
                <Nav />
    
                <Switch>
                    <Route exact path="/dashboard/category" component={GameSelection} />
                    <Route exact path="/dashboard/game" component={Game} />
                    <Route exact path="/dashboard/dictionary" component={Dictionary} />
                    <Route path="/dashboard/:id" component={UserDashboard} />
                </Switch>
            </div>
        )
    }

}

const mapDispatchToProps = {
    wordOfTheDay,
    imageOfTheDay,
    date
}

export default connect(null, mapDispatchToProps)(UserContainer);