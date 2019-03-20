import React, { Component } from 'react';
import MessageChatForm from './MessageChatForm';
import ListTutorOnline from './ListTutorOnline';
export default class Chat extends Component {

    render() {
        return (
            <div className="App">
            <ListTutorOnline/>
            </div>

        );
    }
}