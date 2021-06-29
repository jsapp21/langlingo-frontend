import { Component } from 'react';
import React from 'react-redux'
import Translation from './Translation'
import { options } from '../selectors/language'
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react'



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
        if (e.target.id){
            this.setState({
              language: e.target.id
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const reqObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        }
        

        fetch(`https://langlingo.herokuapp.com/words/`, reqObj)
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

                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ width: 450 }}>
                        <Form size='large' onSubmit={this.handleSubmit}>
                        <Container>
                            <Header as='h2' color='black' textAlign='center'>Dictionary</Header>
                    
                            <Form.Select fluid placeholder='Select a language' options={options} name="language" onChange={this.handleChange} />
                            
                            <Form.Input
                                fluid
                                icon='text cursor'
                                iconPosition='left'
                                placeholder='ex. Hello World'
                                type='text'
                                name="text"
                                onChange={this.handleChange}
                            />

                            <Button basic fluid size='small'>Translate</Button>
                        {this.state.show ? <Translation key={this.state.iso} iso={this.state.iso} english={this.state.words} translate={this.state.translate}/> : null}
                        </Container>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Dictionary;
