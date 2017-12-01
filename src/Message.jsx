import React, {Component} from 'react';


class Message extends Component {
  render() {
    if(this.props.type === 'incomingMessage') {
    return (
      <main className="messages">
          <div className="message">
            <span className="message-username">{this.props.user}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
      </main>
    );
    }

    if(this.props.type === 'incomingNotification') {
      return (
        <div className="message system">{ this.props.userChange }</div>
      );
    }
  }
}
export default Message;