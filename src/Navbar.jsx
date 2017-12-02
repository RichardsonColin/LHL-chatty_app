import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chat-It-Out</a>
        <div className="user-counter">{ `${this.props.userCounter} user(s) online` }</div>
      </nav>
    );
  }
}
export default Navbar;