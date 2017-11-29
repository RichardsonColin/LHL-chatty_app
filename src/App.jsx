import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    },
    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', (msg) => {
      if(msg.data === 'Connected to server') {
        console.log(msg.data);
      } else {
        this.setState({messages: this.state.messages.concat(JSON.parse(msg.data))});
      }
    });
  }

  onNewPost(messageContent, username) {
    const newMessage = {id: '', username: username, content: messageContent};
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    console.log('rendering <App>');
    return (
      <div>
        <ChatBar onNewPost={ this.onNewPost } />
        <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}
export default App;
