"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function() {
        return {
            author: {id: '', firstName: '', lastName: ''}
        };
    },
    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    saveAuthor: function(event){
        event.preventDefault();
        AuthorApi.saveAuthor(this.state.author);
        toastr.success('Author ' +
            this.state.author.firstName + ' ' +
            this.state.author.lastName + ' ' +
            ' saved.');
        this.transitionTo('authors');
    },
    render: function() {
        return (
            <AuthorForm
                author={this.state.author}
                onSave={this.saveAuthor}
                onChange={this.setAuthorState}/>
        );
    }
});

module.exports = ManageAuthorPage;
