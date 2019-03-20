import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});
class AlignItemsList extends React.Component {
    handleClick() {
        console.log("hello")
    };
    componentDidMount(){
        document.title="Support"
      }
    render() {
        return (
            <CardDeck>
                <Card>
                    <CardImg top width="50%" src="https://s3.us-east-2.amazonaws.com/rcs-demo/others/Screen+Shot+2018-08-19+at+11.21.35+AM.png" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Thong Tran</CardTitle>
                        <CardSubtitle>Fullstack Software Engineer</CardSubtitle>

                        <CardText>Hi, I am responsible for maintaining both front-end code and back-end code.
                            I collaborate with my team to handle different issues. Please ping me if you want to keep in touch</CardText>
                        <Button color="primary">Ping me</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" src="https://s3.us-east-2.amazonaws.com/rcs-demo/others/hoapham.jpg" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Hoa Pham</CardTitle>
                        <CardSubtitle>Back End Software Engineer</CardSubtitle>
                        <CardText>Hi, I am responsible for maintaining backend code. Any issue related to system performance, please ping me</CardText>
                        <Button color="primary">Ping me</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" src="https://s3.us-east-2.amazonaws.com/rcs-demo/others/IMG_9132.JPG" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Fatima Barry</CardTitle>
                        <CardSubtitle>Front-end Developer</CardSubtitle>
                        <CardText>Hi, I am responsible for creating GUI, UX and UI design for the app. If you have any 
                            feedback on the app design. Please ping me!
                        </CardText>
                        <Button color="primary">Ping me</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Austin Nocero</CardTitle>
                        <CardSubtitle>Software Engineer</CardSubtitle>
                        <CardText></CardText>
                        <Button color="primary">Ping me</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="50%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>James Harris</CardTitle>
                        <CardSubtitle>Software Engineer</CardSubtitle>
                        <CardText></CardText>
                        <Button color="primary">Ping me</Button>
                    </CardBody>
                </Card>
            </CardDeck>
        );
    }
};
AlignItemsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);