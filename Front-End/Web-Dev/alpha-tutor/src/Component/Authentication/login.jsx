import React, { Component } from 'react';
import {  Form, FormGroup,ButtonGroup} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
//thong is bad 
const DEVELOPMENT_URL = "http://localhost:8080/api/auth/login/";

class Login extends Component {
    constructor(props){
        super(props);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword= this.handleChangePassword.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    };

    logInfo= {
        'username': '',
        'password' : ''
    }
    async handleSubmit(event) {
        event.preventDefault
        var body = JSON.stringify(this.logInfo);
        await fetch(DEVELOPMENT_URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: body
          }).then((response) => {
              console.log(response)
          }
          );

    }

    handleChangePassword(event){
            const value = event.target.value;
            this.logInfo["password"] = value
    }

    handleChangeUsername(event) {
        const value = event.target.value;
        this.logInfo["username"] = value
    }


        render() {
            return(
                <Form onSubmit={this.handleSubmit}>
                <div className="row">
                <FormGroup className="col-md-4 mb-3">
                     <TextField
                              id="username"
                              label="Username"
                              name="username"
                              onChange={this.handleChangeUsername}
                              autoComplete="username"
                              margin="normal"
                              required
                            />
                            <br></br>
                             <TextField
                              id="password"
                              label="Password"
                              name="password"
                              onChange={this.handleChangePassword}
                              autoComplete="password"
                              margin="normal"
                              required
                            />
                            <br></br>
                            <ButtonGroup>
                        <Button  type="submit"> Log in</Button>
                    </ButtonGroup>

                </FormGroup>
                </div>
                </Form>

            );

        }


}


export default Login;
