import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Great App XYZ</h1>
        <h2>Jogging Times App</h2>
        <br />
        <Link to="register" className="btn btn-primary btn-lg">Register</Link>
        &nbsp;
        <Link to="login" className="btn btn-primary btn-lg">Login</Link>
      </div>
    );
  }
}

export default HomePage;
