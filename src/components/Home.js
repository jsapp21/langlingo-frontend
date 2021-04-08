import React from 'react'
import { Grid } from 'semantic-ui-react'
import Login from './Login'
import Signup from "./Signup";
import { Route, Switch } from 'react-router-dom'

const Home = () => {
    return(
        <div>

            <Grid >
              <Grid.Row>
                <Grid.Column width={8}>
                    <div className="ui container">

                        <div className="holder">
                            <div className="bubble bubble-bottom-left">
                                <h1>"Hello"</h1>
                                <h5>English</h5>
                            </div>
                        </div>

                        <div className="holder">
                            <div className="bubble bubble-bottom-left">
                                <h1>"Hola"</h1>
                                <h5>Spanish</h5>
                            </div>
                        </div>

                        <div className="holder">
                            <div className="bubble bubble-bottom-left">
                                <h1>"Bonjour"</h1>
                                <h5>French</h5>
                            </div>
                        </div>
                    </div>

                
                </Grid.Column>
                <Grid.Column width={8}>
                    <Switch>
                        <Route path="/home/signup" component={Signup} />
                        <Route path="/home" component={Login} />
                    </Switch>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </div>
    )

}

export default Home;