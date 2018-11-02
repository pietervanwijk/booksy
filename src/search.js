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

export class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      suggestions: [],
      suggestionList: []
    };
  }

  search = (e) => {
    let query = e.target.value.toLowerCase();
    if(query.length>1){

      let url = 'https://www.googleapis.com/books/v1/volumes?orderby=relevance&q=';

      axios.get(url + query).then(response => {
        let suggestions = response.data.items;
        console.log(suggestions);

        let suggestionList = suggestions.map(r => {
          if(r.volumeInfo.authors && r.volumeInfo.authors && r.volumeInfo.imageLinks) {
              return(
                <Link to={'/books/' + r.id}>
                  <li className="suggestion" key={r.id}>
                    <img src={r.volumeInfo.imageLinks.smallThumbnail} className="list-image"/>
                    <p className="list-author">{r.volumeInfo.authors[0]}</p>
                    <p className="list-title">{r.volumeInfo.title}</p>
                  </li>
                </Link>
              );
          };
        });

        this.setState({
          suggestions : suggestions,
          suggestionList : suggestionList
        });
      });
    }
  }

  chooseBook = (selection) => {
    let id = selection.id;
    history.push("/books/" + id );
  }



  render() {
    return (
      <div className="App">
      <h1>Bksy</h1>
      <input placeholder="Zoek je boek op auteur of titel" className="searchbox" id="searchbox" onChange={this.search} autoComplete="off"/>
      <ul className="suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
      </div>
    );
  }
}
