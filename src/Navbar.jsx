import React, {Component} from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    //this.userCounter = this.userCounter.bind(this);
  }

  // userCounter(){
  //   this.props.userCounter;
  // }


  render() {
    console.log('naaaav', this.props);
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="user-counter">{ `${this.props.userCounter} users online` }</div>
      </nav>
    );
  }
}
export default Navbar;