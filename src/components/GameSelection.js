import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffledCategory } from '../actions/game'
import { gameLanguage } from '../actions/game'

class GameSelection extends Component {
    state = {
        category: '',
        language: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`http://localhost:3000/categories/${this.state.category}/` + this.state.language, reqObj)
        .then(resp => resp.json())
        .then(cards => { 
            console.log(cards)
              this.props.shuffledCategory(cards)
              this.props.gameLanguage(this.state)
              this.props.history.push('/dashboard/game')
        })
      
    }

    render(){
        return(
            <div className="ui container">
                <form className="ui form" onSubmit={this.handleSubmit}>
                <h2>Play Game</h2>
                <div className="equal width fields">
                    <div className="field">
                        <select className="ui dropdown" name="language" onChange={this.handleChange}>
                            <option value="">Select a language</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="pt">Português</option>
                            <option value="ru">Russian</option>
                            <option value="th">Thai</option>
                            <option value="vi">Vietnamese</option>
                        </select>
                    </div>
                    <div className="field">
                        <select className="ui dropdown" name="category" onChange={this.handleChange}>
                            <option value="">Select category</option>
                            <option value="1">Animals</option>
                            <option value="2">Emotions</option>
                            <option value="3">Foods</option>
                            <option value="4">Objects</option>
                            <option value="5">Sports</option>
                        </select>
                    </div>
                </div>
                <button className="ui basic button">Create Game</button>
                </form>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    shuffledCategory,
    gameLanguage
 }

export default connect(mapStateToProps, mapDispatchToProps)(GameSelection);