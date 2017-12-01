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
    let currentUser = event.target.value;

    if(currentUser === '') {
      currentUser = 'Anonymous';
    }

    this.props.handleNewUser(currentUser);
  }

  handleKeyPress(event) {
    // If enter is pressed.
    if(event.charCode === 13) {
      // Prevents an empty input field.
      if(!event.target.value) {
        return;
      }

      this.props.onNewPost(this.state.message);
      event.target.value = '';
      this.state.message = '';
    }
  }

  render() {
    //console.log('rendering <ChatBar>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={ this.onUsernameInput } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onInput={ this.onMessageInput } onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;