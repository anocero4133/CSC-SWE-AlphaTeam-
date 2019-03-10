import React, { Component } from 'react';
import { Form, FormGroup, ButtonGroup } from 'reactstrap';
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

const DEVELOPMENT_URL = "http://localhost:8080/api/student/add";
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
    async handleSubmit(event) {
        event.preventDefault();
        var body = JSON.stringify(this.logInfo);
        axios.post(DEVELOPMENT_URL, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response)
            this.setState({
                isHidden:true 
            })
        }).catch(err => {
            console.log("Heere is the rror")
            console.log(err)
            this.setState({
                isHidden: false
            })
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
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={this.handleChange}
                                    autoComplete="username"
                                    margin="normal"
                                    type="email"
                                    required
                                />
                                <br></br>
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
                                    name="username"
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