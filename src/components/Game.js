import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardName from './CardName'
import { updateUserGames } from '../actions/users'
import { finishGame } from '../actions/game'
import { Button, Flag } from 'semantic-ui-react'

class Game extends Component {
    state = {
        points: 0,
        finished: false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.game.matched.length < this.props.game.matched.length) {
            setTimeout(() => {
                this.setState({
                    points: this.state.points + 2
                })
            }, 1000);
    }

        if (prevProps.game.matched.length === 6) {
            setTimeout(() => {
                this.setState({
                    points: this.state.points,
                    finished: true
                })
            }, 1000);
        }
    }

    renderCards = () => {
        return  this.props.game.cards.map(card => {
            return <CardName key={card.name ? card.name : card.id} name={card.name ? card.name : card.image} 
            id={card.id} isComplete={card.isComplete} guessArr={this.props.game.guess} iso={this.props.game.language}
            match={card.name ? card.name : null} />
        })
    }

    playAgain = (e) => {
        e.preventDefault()

        const game = {
            user_id: this.props.user.id,
            category_id: this.props.game.category_id,
            language: this.props.game.language,
            points: this.state.points 
        }

        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        }

        fetch(`https://langlingo.herokuapp.com/games/`, reqObj)
        .then(resp => resp.json())
        .then(game => { 
              this.props.updateUserGames(game)
              this.props.finishGame(this.props.game)
              this.props.history.push('/dashboard/category')
        })
    }

    setOpen = () => {
        if(this.state.finshed) {
            this.setState({
                ...this.state,
                open: true
            })
        }
    }

    render(){
            return(
                <div className="group">
                        <h2>Language: <Flag name={this.props.game.language} /> Game points: {this.state.points}</h2>
                    <div className="game">
                        {this.renderCards()}
                        {this.state.finished ?  <h1>Great Job! Practice makes perfect. <Button basic onClick={this.playAgain}>Log Progress.</Button></h1> : null}
                    </div>
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
    updateUserGames,
    finishGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
