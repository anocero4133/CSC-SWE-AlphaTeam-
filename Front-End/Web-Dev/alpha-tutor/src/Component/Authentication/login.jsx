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
import { CardLink } from 'reactstrap';
import CardMedia from '@material-ui/core/CardMedia';
import '../../CSS/LogInCss.css'
const Swal = require('sweetalert2');
const DEVELOPMENT_URL = "http://localhost:8080/api/auth/";
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

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
    };
    componentDidMount(){
        document.title = "Log in ";
        document.body.classList.add("background-white");

    }
    logInfo = {
        'username': '',
        'password': ''
    }

    checkIfGSUEmail(email) {
        if (email.endsWith("@gsu.edu") || email.endsWith("@student.gsu.edu")) {
            return true;
        }
        return false;
    }


    signUp() {
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
                    var url = DEVELOPMENT_URL + "mail/sendCode/" + email
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
                        var url = DEVELOPMENT_URL + "signUpCode/" + result.value + "/" + code;
                        return fetch(url)
                                .then(response => {
                                    if (!response.ok) {
                                    throw new Error(response.statusText)
                                    }
                                    this.props.history.push("/signUp/");
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
        // this.props.history.push('/signUp');
    }
    async handleSubmit(event) {
        event.preventDefault();
        var body = JSON.stringify(this.logInfo);
        var url = DEVELOPMENT_URL + "/login/"
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
    }
    componentWillUnmount(){

    }
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name
        this.logInfo[name] = value
    }

    render() {
        const { classes } = this.props;
        var UserNotFound;
        if (this.state.isHidden === false) {
            UserNotFound = <div>
                <Typography className={classes.pos} color="red" style={{ fontSize: 10, color: 'red' }}>
                    User not found. <br></br>
                    Check your username and password
                    </Typography>
            </div>
        }
        return (
            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
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
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={this.handleChange}
                                    autoComplete="username"
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
                                    autoComplete="password"
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
                                <Button variant="outlined" color="primary" className={classes.button} type="submit">Log in </Button>
                                <Button variant="outlined" color="secondary" className={classes.button} onClick={this.signUp}> Sign up </Button>
                            </ButtonGroup>
                        </CardActions>
                        <CardActions>
                            <CardLink href="/forget/username" >Forget username?</CardLink>
                        </CardActions>
                        <CardActions>
                            <CardLink href="/forget/password">Forget password?</CardLink>
                        </CardActions>
                    </Form>
                </Card>
            </div>
        );
    }

}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
