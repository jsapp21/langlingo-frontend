import { Component } from 'react';
import React from 'react-redux'
import Translation from './Translation'


class Dictionary extends Component {
    state = {
        language: '',
        text: '',
        words: '',
        translate: '',
        iso: '',
        show: false
    }

    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        

        fetch(`http://localhost:3000/words/`, reqObj)
        .then(resp => resp.json())
        .then(data => { 
            
            this.setState({
                language: '',
                text: '',
                words: data.text,
                translate: data.translate,
                iso: data.language,
                show: true
            })
        })
      
    }

    render(){
        return(
            <div className="ui container">
            <form className="ui form" onSubmit={this.handleSubmit}>
            <h2>Dictionary</h2>
            <div className="equal width fields">
                <div className="field">
                    <select className="ui dropdown" name="language" value={this.state.language} onChange={this.handleChange}>
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
                <input placeholder="ex. Hello World" name="text" value={this.state.text} onChange={this.handleChange}/>
                </div>
            </div>
            <button className="ui basic button">Translate</button>
            </form>
            <div className="ui divider"></div>
                {this.state.show ? <Translation key={this.state.iso} iso={this.state.iso} english={this.state.words} translate={this.state.translate}/> : null}
        </div>
        )
    }
}

export default Dictionary;