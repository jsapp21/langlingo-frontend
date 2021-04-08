import React, { Component } from 'react'
import { Button, Container, Form, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/users'
import { Link } from 'react-router-dom'

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: ''
      }
    
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value 
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
    
        const newUser = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state)
        }
        
        this.setState({
          email: '',
          password: ''
        })
        
        fetch('http://localhost:3000/login', newUser)
        .then(resp => resp.json())
        .then(user => {

            console.log(user.user)
            if (user.error) {
                this.setState({
                    error: user.error 
                })
            } else {
                this.props.loginSuccess(user.user)
                localStorage.setItem('token', user.token)
                this.props.history.push(`/dashboard/${user.user.id}`)
            }
        })
    
      }
    
    
    render() {

        return(
                <Grid textAlign='center' verticalAlign='middle'>
                <Grid.Column style={{ width: 450 }}>
                    <Form size='large' onSubmit={this.handleSubmit}>
                    <Container>
                        <Header as='h2' color='black' textAlign='center'>Test your language skills with this memory matching game.</Header>
                        {this.state.error ? <h5 style={{color: 'yellow'}}>{this.state.error}</h5> : null}
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Email' name="email" onChange={this.handleChange} />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            onChange={this.handleChange}
                        />

                        <Button color='yellow' fluid size='small'>Login</Button>
                    </Container>
                    </Form>
          
                    New to us? <Link to='/home/signup'>Sign Up</Link>
                    
                </Grid.Column>
            </Grid>

        )
    }

}


const mapDispatchToProps = {
    loginSuccess
}

export default connect(null, mapDispatchToProps)(Login);