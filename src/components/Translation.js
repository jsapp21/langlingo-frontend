import React, { Component } from 'react'
import { selectLanguage } from '../selectors/language'

class Translation extends Component {

    handleClick = () => {

        const audio = {
            text: this.props.translate,
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

    render(){
        const { english, translate, iso } = this.props
        return (
            <div className="ui container">
                <div className="holder">
                    <div className="bubble bubble-bottom-left">
                        <h1>{`"${english}"`}</h1>
                        <h5>English</h5>
                    </div>
                </div>
                
                <div className='holder'>
                    <div className="bubbleTwo bubble-bottom-left">
                        <h1>{translate}</h1>
                    
                        <h5 style={{ textDecoration: 'none' }}>{selectLanguage(iso)}</h5>
                    <button className="circular ui icon button" onClick={this.handleClick}>
                            <i className="play icon"></i>
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Translation;