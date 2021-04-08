import React, { Component } from 'react'
import { connect } from 'react-redux'
import Language from './Language'
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
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"Spanish"} category={langCat} iso={l} />
                case 'fr':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"French"} category={langCat} iso={l} />
                case 'de':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"German"} category={langCat} iso={l} />
                case 'pt':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"Português"} category={langCat} iso={l} />
                case 'ru':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return<Language key={l} language={"Russian"} category={langCat} iso={l} />
                case 'th':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"Thai"} category={langCat} iso={l} />
                case 'vi':
                    langCat = this.props.user.games.filter(game => game.language === l)
                    return <Language key={l} language={"Vietnamese"} category={langCat} iso={l} />
                default:
                    return l
                }
        })

        return final
       
    }

    language = () => {
        switch (this.props.wod.language) {
            case 'es':
               return  "Translated to Spanish."  
            case 'fr':  
                return "Translated to French"
            case 'de': 
                return "Translated to German"
            case 'pt':
                return "Translated to Português"
            case 'ru':
                return "Translated to Russian"
            case 'th':
                return "Translated to Thai"
            case 'vi':
                return "Translated to Vietnamese"
            default:
                return this.props.wod.language
        }
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
                                        <Header.Subheader>{this.language()}</Header.Subheader>
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


