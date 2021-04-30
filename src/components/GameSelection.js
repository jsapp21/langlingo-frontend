import React, { Component } from 'react'
import { connect } from 'react-redux'
import { shuffledCategory } from '../actions/game'
import { gameLanguage } from '../actions/game'
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react'
import { options } from '../selectors/language'
import { categories } from '../selectors/category'

class GameSelection extends Component {
    state = {
        category: '',
        language: ''
    }

    handleChange = (e) => {
        if (e.target.id.length === 2){
            this.setState({
              language: e.target.id
            })
        } else {
            this.setState({
                category: e.target.id
            })
        }
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
                <Grid textAlign='center' verticalAlign='middle'>
                    <Grid.Column style={{ width: 450 }}>
                        <Form size='large' onSubmit={this.handleSubmit}>
                        <Container>
                            <Header as='h2' color='black' textAlign='center'>Play Game</Header>
                    
                            <Form.Select fluid placeholder='Select a language' options={options} name="language" onChange={this.handleChange} />
                            <Form.Select fluid placeholder='Select a language' options={categories} name="category" onChange={this.handleChange} />

                            <Button basic fluid size='small'>Create Game</Button>
                        </Container>
                        </Form>
                    </Grid.Column>
                </Grid>
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