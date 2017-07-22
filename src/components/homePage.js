"use strict";

var React = require('react');

var Home = React.createClass({
   render: function() {
       return (
           <div className="jumbotron">
               <h1>Great App XYZ</h1>
               <p>This is a really Great App!</p>
           </div>
       );
   }
});

module.exports = Home;
