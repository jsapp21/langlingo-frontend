import React, { Component } from 'react'
import { connect } from 'react-redux'
import Language from './Language'
import { selectLanguage } from '../selectors/language'
import { Header, Segment, Grid, Button } from 'semantic-ui-react'

class UserDashboard extends Component {
      
    languages = () => {
        let lang
        if (this.props.user.games.length === 0) {
            lang = [this.props.user.language]
        } else {
            lang = this.props.user.games.map(game => game.language)
        }
       
       const removeDuplicates = (array) => {
            const flag = {}
            const uniqueLanguage = []
            
            array.forEach(lang => {
                if (!flag[lang]) {
                    flag[lang] = true
                    uniqueLanguage.push(lang)
                }
        })
        return uniqueLanguage
    }

        const finalLang = removeDuplicates(lang)

        const final = finalLang.map(l =>{

            let langCat

            switch (l) {
                case 'es':
                case 'fr':
                case 'de':
                case 'pt':
                case 'ru':
                case 'th':
                case 'vi':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={selectLanguage(l)} category={langCat} iso={l} />
                default:
                    return l
                }
        })

        return final
       
    }

    handleAudio = () => {

        const audio = {
            text: this.props.wod.translate,
            voice: this.props.wod.language
        }

        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(audio)
          }

        fetch(`http://localhost:3000/speech`, reqObj)
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

      render() {
        
          const square = { width: 250, height: 250 }

          return(
            <div className="ui container">
                    <Grid>
                        <Grid.Row>
                        <Grid.Column width={8}>
                            <div style={{ textAlign: 'center' }}>
                                <h1>Welcome, {this.props.user.username}</h1>
                                <div className="ui clearing divider"></div>
                                <h2>Word for {this.props.wod.date}</h2>
                                <Segment circular style={square}>
                                    <Header as='h2'>
                                    {this.props.wod.word} {this.props.wod.image}
                                        <Header.Subheader>{`Translated to `}{selectLanguage(this.props.wod.language)}</Header.Subheader>
                                    </Header>
                                    </Segment>
                                    <Segment circular inverted color='green' style={square}>
                                    <Header as='h2' inverted>
                                    {this.props.wod.translate}                            
                                    </Header>
                                    <Button circular icon='play' onClick={this.handleAudio} />
                                </Segment>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                                <h1>Languages</h1>
                                <div className="ui clearing divider"></div>
                                {this.languages()}
                            </div>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                
            </div>
        )
      }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        game: state.game,
        wod: state.wod
    }
}


export default connect(mapStateToProps)(UserDashboard);