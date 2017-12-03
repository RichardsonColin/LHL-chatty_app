import React, {Component} from 'react';


class Message extends Component {
  render() {

    // Assings unique colour to user name.
    const divStyle = {
      color: this.props.colour
    };

    if(this.props.type === 'incomingMessage') {
      return (
        <main className="messages">
            <div className="message">
              <span className="message-username" style={divStyle}>{this.props.user}</span>
              <span className="message-content">{this.props.content}</span>
            </div>
            <img className="message-image" src={ this.props.image } />
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