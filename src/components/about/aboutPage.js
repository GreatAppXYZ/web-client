"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
      willTransitionTo: function(transition, params, query, callback){
          if(!confirm('Are you sure you wanna join?')) {
              transition.abort();
          } else {
              callback();
          }
      },
        willTransitionFrom: function(transition, component) {
            if(!confirm('Are you sure wanna leave?')) {
                transition.abort();
            }
        }
    },
    render: function() {
        return (
            <div>
                <h1>About</h1>
                <p>
                    This app uses:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;
