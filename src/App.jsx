import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
  currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: 'Reginald',
      content: 'Has anyone seen my marbles?',
    },
    {
      id: 2,
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Reginald. You lost them for good.'
    }
    ]
  },
  this.onNewPost = this.onNewPost.bind(this);
  }

onNewPost(content, username) {
  const messagesLength = this.state.messages.length + 1;

  setTimeout(() => {

  const newMessage = {id: messagesLength, username: username, content: content};
  const messages = this.state.messages.concat(newMessage);

  this.setState({messages: messages})
  }, 500);
}

  render() {
    return (
      <div>
        <ChatBar onNewPost={ this.onNewPost } />
        <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}
export default App;
