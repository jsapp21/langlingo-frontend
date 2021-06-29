import React, { Component } from 'react'
import { connect } from 'react-redux'
import { guess } from '../actions/game'

class CardName extends Component {
    state = {
        isFlipped: false,
        className: 'reverse'
    }

    handleClick = () => {
        
        if (!this.state.isFlipped) {
            this.setState({
                className: 'flipped',
                isFlipped: true
            })
            this.props.guess(this.props.id)
        }
    }

    componentDidUpdate(prevProps, prevState) {  
        if (!prevProps.isComplete && this.props.isComplete) {
            this.finished()
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    className: 'correct'                
                })
            }, 1000);
        } else if (prevProps.guessArr.length === 1 && this.props.guessArr.length === 0 && this.state.className !== 'correct') {
            setTimeout(() => {
                this.setState({
                    className: 'reverse',
                    isFlipped: false
                })
            }, 1000);
        }
    }

    finished = () => {
        
        if (typeof this.props.match === 'string') {
            const audio = {
                text: this.props.match,
                voice: this.props.iso
            }
    
            const reqObj = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(audio)
              }
    
            fetch(`https://langlingo.herokuapp.com/speech`, reqObj)
            .then(res => {
                var reader = res.body.getReader();
                return reader
                .read()
                .then((result) => {
                return result;
                });
            })
    
            .then((response) => {
                var blob = new Blob([response.value], { type: 'audio/mp3' });
                var url = window.URL.createObjectURL(blob)
                window.audio = new Audio();
                window.audio.src = url;
                window.audio.play();
              })
        }
        
    }

    

    render(){
        return(
                <div onClick={this.handleClick} data-view="card" className={this.state.className} data-look="visible">
                    {this.state.className === 'reverse' ? null : <h3>{this.props.name}</h3>}
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game.matched
    }
}

const mapDispatchToProps = {
    guess
 }

export default connect(mapStateToProps, mapDispatchToProps)(CardName);