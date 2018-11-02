import React, { Component } from 'react';
import './App.css';
import { Search } from './search.js'
import { Book } from './book.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Search}/>
          <Route path="/books" component={Book}/>
        </div>
      </Router>
    );
  }
}

export default App;
