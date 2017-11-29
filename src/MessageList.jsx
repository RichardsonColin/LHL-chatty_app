import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('rendering <MessageList>');
    const posts = this.props.messages.map((post) => {
      return <Message
        key={ post.id }
        user={ post.username }
        content={ post.content } />
    });

    return (
      <section>
        { posts }
      </section>
    )
  }
}
export default MessageList;