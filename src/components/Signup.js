import React, { Component } from 'react'
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signUpSuccess } from '../actions/users'

class SignUp extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        error: '',
        language: ''
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

        const newUser = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              user: this.state
          })
        }
        
        this.setState({
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            language: ''
        })
        
        fetch('http://localhost:3000/users', newUser)
        .then(resp => resp.json())
        .then(user => {
            if (user.error) {
                this.setState({
                    error: user.error 
                })
            } else {
                this.props.signUpSuccess(user)
                localStorage.setItem('token', user.token)
                this.props.history.push(`/dashboard/${user.id}`)
            }
        })
    
      }
    
    
    render() {

        const options = [
            { key: 'a', id: 'es', text: 'Spanish', value: 'es' },
            { key: 'b', id: 'fr', text: 'French', value: 'fr' },
            { key: 'c', id: 'de', text: 'German', value: 'de' },
            { key: 'd', id: 'pt', text: 'Português', value: 'pt' },
            { key: 'e', id: 'ru', text: 'Russian', value: 'ru' },
            { key: 'f', id: 'th', text: 'Thai', value: 'th' },
            { key: 'g', id: 'vi', text: 'Vietnamese', value: 'vi' }
          ]

        return(
            <div>
                <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ width: 450 }}>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Container>
                        <Header as='h2' color='black' textAlign='center'>Create your profile</Header>
                        {this.state.error ? <h5 style={{color: 'yellow'}}>{this.state.error}</h5> : null}
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name="username" onChange={this.handleChange} />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Email' name="email" onChange={this.handleChange} />
                        <Form.Select fluid placeholder='Language you want to learn' options={options} name="language" onChange={this.handleChange} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={this.handleChange}
                        />

                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password Confirmation'
                            type='password'
                            name="password_confirmation"
                            onChange={this.handleChange}
                        />

                        <Button color='yellow' fluid size='small'>Login</Button>
                    </Container>
                    </Form>

                </Grid.Column>
            </Grid>

            </div>
        )
    }

}


const mapDispatchToProps = {
    signUpSuccess
}

export default connect(null, mapDispatchToProps)(SignUp);