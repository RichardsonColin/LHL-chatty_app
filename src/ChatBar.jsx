import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onMessageInput = this.onMessageInput.bind(this);
    this.onUsernameInput = this.onUsernameInput.bind(this);
  }

  onMessageInput(event) {
    this.setState({
    message: event.target.value
    });
  }

  onUsernameInput(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleKeyPress(event) {
    // If enter is pressed.
    if(event.charCode === 13){
      const currentUser = this.state.username ? this.state.username : 'Anonymous';

      //this.socket.send(msg);

      this.props.onNewPost(this.state.message, currentUser);
      this.setState({ content: '' });
      event.target.value = '';
    }
  }

  render() {
    console.log('rendering <ChatBar>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={ this.onUsernameInput } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={ this.onMessageInput } onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;