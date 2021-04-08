import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOffUser } from '../actions/users'
import { finishGame } from '../actions/game'


class Nav extends Component {

    handleClick = () => {
        this.props.logOffUser(this.props.user)
        this.props.finishGame(this.props.game)
        window.localStorage.clear()
    }

    render() {
        return(
            <div className="ui container">

                    <Link to='/dashboard/category'>
                        <button className="ui circular green right floated medium button">Play</button>
                    </Link>
                    
                    <Link to='/home'>
                        <button className="ui circular basic color right floated medium button" onClick={this.handleClick}>Sign Off</button>
                    </Link>
                    
                    <Link to='/dashboard/dictionary'>
                        <button className="ui circular basic color right floated medium button">Dictionary</button>
                    </Link>

                    <Link to={`/dashboard/${this.props.user.id}`}>
                        <button className="ui circular basic color right floated medium button">Home</button>
                    </Link>
            
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game
    }
}

const mapDispatchToProps = {
    logOffUser,
    finishGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);