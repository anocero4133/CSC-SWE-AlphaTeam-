import React, { Component } from 'react';
import { Form,  ButtonGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
const Swal = require('sweetalert2');
const DEVELOPMENT_URL = "https://tutor-service-back-end.herokuapp.com/api/";

// const DEVELOPMENT_URL = "http://localhost:8080/api/";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
      },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    card: {
        maxWidth: 345,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state={
            isHidden: true
        }
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    logInfo = {
        userName: '',
        password: '', 
        firstName : '',
        lastName: '',
        roles: [],
        email: ''
    };
    handleCancel() { 
        this.props.history.push('/');
    }
    checkIfGSUEmail(email) {
        if (email.endsWith("@gsu.edu") || email.endsWith("@student.gsu.edu")) {
            return true;
        }
        return false;
    }

    async handleSubmit(event) {
        event.preventDefault();
            Swal.fire({
            title: 'Authentication',
            input: 'text',
            text: "Hi there, to use this app, you must be GSU student. Please have your email here and we will send you a code to authenticate",
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            preConfirm: (email) => {
                if (email === ""){
                    Swal.showValidationMessage(
                        `Request failed: Email can't be blank`
                    )
                }
                else if (this.checkIfGSUEmail(email) === false) {
                    Swal.showValidationMessage(
                        `Request failed: Not a GSU email`
                    )
                } else {
                    var url = DEVELOPMENT_URL + "auth/mail/sendCode/" + email
                    return fetch(url)
                                .then(response => {
                                    if (!response.ok) {
                                    throw new Error(response.statusText)
                                    }
                                 
                                })
                                .catch(error => {
                                    Swal.showValidationMessage(
                                    `Request failed: This email has already been registered`
                                    )
                                })
                }
            },
        }).then((result) => {
            if (result.value) {
                console.log(result.value);
                Swal.fire({
                    title: 'Code authentication',
                    input: 'text',
                    text: "We sent you a code. Please have a code here",
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    allowOutsideClick: false,
                    confirmButtonText: 'Authenticate',
                    showLoaderOnConfirm: true,
                    preConfirm: (code) => {
                        var url = DEVELOPMENT_URL + "auth/signUpCode/" + result.value + "/" + code;
                        return fetch(url)
                                .then(response => {
                                    if (!response.ok) {
                                    throw new Error(response.statusText)
                                    }
                                    // Setting the email 
                                    this.logInfo.email = result.value;
                                    var studentRole = {
                                        "description": "CS student at GSU",
                                        "roleName": "Student" 
                                      }
                                    this.logInfo.roles.push(studentRole);
                                    console.log("Success authenticated "  , this.logInfo);
                                    var body = JSON.stringify(this.logInfo);
                                    var url = DEVELOPMENT_URL + "auth/signUp/student";
                                    axios.post(url, body, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(response => {
                                        var data = response.data;
                                        var username = data.userName;
                                        console.log(data)
                                        var roles = data.roles; 
                                        var arrRoles = []
                                        for (var i = 0 ; i < roles.length; ++i){
                                            arrRoles.push(roles[i].roleName)
                                        }
                                        localStorage.setItem("username", username);
                                        localStorage.setItem("roles", arrRoles);
                                         window.location.reload();
                                        this.setState({
                                            isHidden: true
                                        })
                                    }).catch(err => {
                                        console.log("Heere is the rror")
                                        console.log(err)
                                        this.setState({
                                            isHidden: false
                                        })
                                    })
                                })
                                .catch(error => {
                                    Swal.showValidationMessage(
                                    `Request failed: Code not correct`
                                    )
                                }) 
                    },
                }).then((res) => {

                })
            }
        })
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name
        this.logInfo[name] = value
    }

    render() {
        const { classes } = this.props;
        var UserNotFound;  
        if (this.state.isHidden === false){
            UserNotFound = <div> 
                  <Typography className={classes.pos} color="red" style={{fontSize:10, color: 'red'}}>
                        User not found. Please check your username and password
                    </Typography> 
                 </div>
        }
        return (

            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image="http://oakfnd.org/images/gsu%20logo.jpg?crc=343172255"
                        title="Contemplative Reptile"
                    />
                    <Form onSubmit={this.handleSubmit}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    required
                                />
                                <br></br>
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    required
                                />
                                 <br></br>
                                <TextField
                                    id="username"
                                    label="Username"
                                    name="userName"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    required
                                />
                                <br></br>
                                <TextField
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    margin="normal"
                                    required
                                />

                            </Typography>
                            <Typography component="p">
                            {UserNotFound}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ButtonGroup>
                                <Button variant="outlined" color="primary" className={classes.button} type="submit">Sign Up Now </Button>
                                <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleCancel} > Cancel </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Form>
                </Card>
            </div>
        );
    }

}
SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
;