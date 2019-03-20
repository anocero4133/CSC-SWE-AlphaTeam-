import React, { Component } from 'react';

export default class MessageChatForm extends Component {
    constructor(){
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            text: ''
        }
    }
    onChange(e){
        this.setState({text: e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        console.log(e.target.value)
    }
    render() {
        return (
            <div className="message-send-form">
                <form onSubmit={e => this.onSubmit(e)}>
                    <input
                        onChange={e => this.onChange(e)}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER"
                        autofocus="true"
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}