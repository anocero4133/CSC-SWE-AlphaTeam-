import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Form,  ButtonGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../../Utils/Loading'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import swal from 'sweetalert';

var DEVELOPMENT_URL = "https://tutor-service-back-end.herokuapp.com/api/auth/forgetPassword/";
// var DEVELOPMENT_URL = "http://localhost:8080/api/auth/forgetPassword/";
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
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isHidden: true,
            isPasswordFormatError: true,
            isLoading: false
        }
    }
    pass = {
        password: ''
    }
    email = "";
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        if (name === "password") {
            this.pass[name] = value;
            if (value.length < 8){
                this.setState({
                    isPasswordFormatError:false
                })
            }else{
                this.setState({
                    isPasswordFormatError:true
                }) 
            }
        }
        if (name === "password_2") {
            if (this.pass['password'] !== value) {
                this.setState({
                    isHidden: false
                })
            } else {
                this.setState({
                    isHidden: true
                })
            }
        }
    }
    handleCancel() {
        this.props.history.push('/')
    }

    handleSubmit(event) {
        var email = this.props.location.pathname.split("/")[3];
        this.setState({
            isLoading: true
        })
        event.preventDefault();
        var url = DEVELOPMENT_URL;
        url += email
      
        var body = JSON.stringify(this.pass);
        axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response)
            this.setState({
                isHidden: true,
                isLoading: false,
                isPasswordFormatError: true
            })
            swal({
                title: "SUCCESSFULLY",
                text: "Your password has been successfully reset",
                icon:"success",
                button: "Log in now"
            }).then((value)=>{
                this.props.history.push('/')
            })
          
        }).catch(err => {
            console.log("Heere is the rror")
            console.log(err)
            this.setState({
                isHidden: false,
                isLoading: false,
                isPasswordFormatError: false
            })
        })
    }
    render() {
        if (this.state.isLoading) {
            return <CircularIndeterminate />
        }
        const { classes } = this.props;
        var PasswordNotMatching;
        if (this.state.isHidden === false) {
            PasswordNotMatching = <div>
                <Typography className={classes.pos} color="red" style={{ fontSize: 10, color: 'red' }}>
                    Password is not matching.
                    </Typography>
            </div>
        }

        var PasswordFormatError ; 
        if (this.state.isPasswordFormatError === false){
            PasswordFormatError = <div>
            <Typography className={classes.pos} color="red" style={{ fontSize: 10, color: 'red' }}>
                Minimum length of password is 8 characters
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
                                    id="password"
                                    label="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    type="password"
                                    autoComplete="a"
                                    margin="normal"
                                    required
                                />
                                {PasswordFormatError}
                                <TextField
                                    id="password_2"
                                    label="Re-type password"
                                    name="password_2"
                                    onChange={this.handleChange}
                                    type="password"
                                    autoComplete="a"
                                    margin="normal"
                                    required
                                />
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" style={{ fontSize: 10 }}>
                                Enter your new password.
                            </Typography>
                            {PasswordNotMatching}
                        </CardContent>
                        <CardActions>
                            <ButtonGroup>
                                <Button variant="outlined" color="secondary" className={classes.button} type="submit">Reset </Button>
                                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleCancel} > Cancel </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default withStyles(styles)(ResetPassword);
