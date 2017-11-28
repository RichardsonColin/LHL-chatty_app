import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  // let users =

  constructor(props) {
    super(props);
    this.state = {
  currentUser: {name: "Reginald"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Reginald",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}}

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({loading: true})  // change the state. this calls render() and the component updates.
  //   }, 500)
  // }

  render() {
    return (
      <div>
      <ChatBar user={ this.state.currentUser.name } />
      <MessageList messages={ this.state.messages }/>
      </div>
    );
  }
}
export default App;
