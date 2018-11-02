import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'

const history = createBrowserHistory();

export class Book extends Component {

  constructor (props) {
    super(props);
    this.state = {
      suggestions: [],
      suggestionList: []
    };
  }

  render() {
    return (
      <h1>BOOK</h1>
    );
  }
}
