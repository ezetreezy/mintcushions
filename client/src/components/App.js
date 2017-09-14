//main View layer
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import CreateAccount from './CreateAccount';
import MessageBar from './MessageBar';
import LoginAccount from './LoginAccount';
import Dashboard from './Dashboard';

const ReviewNew = () => <h2>Review New</h2>

//BrowserRouter ->
//brains of react-router-dom, looks at current url, and changes the set of components
//Browser router expect one child(div)

//Route ->
//react component that sets up a rule of a route and a component

//Connect from react-redux ->
//gives our components the ability to call action creators

class App extends Component {


  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
          return (
            <div>
              <BrowserRouter>
                <div>
                  <Header />
                  <MessageBar />
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route path="/reviews/new" component={ReviewNew} />
                  <Route path="/createaccount" component={CreateAccount} />
                  <Route path="/login" component={LoginAccount} />
                </div>
              </BrowserRouter>
            </div>
              );
            }
}

export default connect(null, actions)(App);
