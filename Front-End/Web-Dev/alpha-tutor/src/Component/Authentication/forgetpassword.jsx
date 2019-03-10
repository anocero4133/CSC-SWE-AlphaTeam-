import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Form, FormGroup, ButtonGroup } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularIndeterminate from '../../Utils/Loading'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
var DEVELOPMENT_URL = "http://localhost:8080/api/auth/sendPasswordReset/";
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
class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state= {
            isHidden: true,
            isSendEmail :false,
            isLoading:  false
        }
    }
    email = "";
    handleChange(event) { 
        const value = event.target.value;
        this.email = value;
    }
    handleCancel(){
        this.props.history.push('/')
    }

    handleSubmit(event) { 
            this.setState({
                isLoading: true
            })
            event.preventDefault();
            var email = DEVELOPMENT_URL;
            email += this.email
            axios.post(email ,{
            }).then(response => {
                console.log(response)
                this.setState({
                    isHidden: true,
                    isSendEmail: true,
                    isLoading: false
                })
            }).catch(err => {
                console.log("Heere is the rror")
                console.log(err)
                this.setState({
                    isHidden: false,
                    isSendEmail: false,
                    isLoading : false
                })
            })
    }
        render() { 
            if (this.state.isLoading) {
                return <CircularIndeterminate />
            }
    
            const { classes } = this.props;
            var UserNotFound;  
            if (this.state.isHidden === false){
                UserNotFound = <div> 
                      <Typography className={classes.pos} color="red" style={{fontSize:10, color: 'red'}}>
                     User not found. Please check your email
                        </Typography> 
                     </div>
            }
            var ConfirmSendEmail ; 
            if (this.state.isSendEmail === true){
                ConfirmSendEmail = <div> 
                      <Typography className={classes.pos} color="red" style={{fontSize:10, color: 'green'}}>
                            We have sent an username to your email.  
                        </Typography> 
                     </div>
            } 
            return(
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
                                    type="email"
                                    autoComplete="a"
                                    margin="normal"
                                    required
                                />
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary" style={{fontSize:10}}>
                            Enter your GSU email so that we can send the link to help you reset password
                                    </Typography>
                                    {UserNotFound}
                                    {ConfirmSendEmail}
                        </CardContent>
                        <CardActions>
                            <ButtonGroup>
                                <Button variant="outlined" color="primary" className={classes.button} type="submit">Send </Button>
                                <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleCancel} > Cancel </Button>
                            </ButtonGroup>
                        </CardActions>
                    </Form>
                </Card>
            </div>
            );
        }
}
export default withStyles(styles)(ForgetPassword);
