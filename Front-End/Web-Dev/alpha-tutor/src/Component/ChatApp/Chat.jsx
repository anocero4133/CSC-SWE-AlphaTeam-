import React, { Component } from 'react';
import MessageChatForm from './MessageChatForm';

export default class Chat extends Component {

    render() {
        return (
            <div className="App">         
               <MessageChatForm />
            </div>

        );
    }
}