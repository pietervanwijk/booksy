import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Link } from 'react-router-dom'
import logo from './logo.svg'


export class Search extends Component {

  constructor (props) {
    super(props);
    this.state = {
      suggestions: [],
      suggestionList: []
    };
  }

  search = (e) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?orderby=relevance&q=';
    let query = e.target.value.toLowerCase();
    if(query.length>1){

      axios.get(url + query).then(response => {
        let suggestions = response.data.items;
        console.log(suggestions);

        let suggestionList = suggestions.map(r => {
          if(r.volumeInfo.authors && r.volumeInfo.authors && r.volumeInfo.imageLinks) {
              return(
                <Link to={'/books/' + r.id}>
                  <li className="suggestion" key={r.id}>
                    <table>
                      <td className="list-td">
                        <img src={r.volumeInfo.imageLinks.smallThumbnail} className="list-image"/>
                      </td>
                      <td className="list-td text-td">
                        <p className="list-author">{r.volumeInfo.authors[0]}</p>
                        <p className="list-title">{r.volumeInfo.title}</p>
                      </td>
                    </table>
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

  render() {
    return (
      <div className="App">
      <img src={logo} className="logo"/>
      <input placeholder="Zoek je boek op auteur of titel" className="searchbox" id="searchbox" onChange={this.search} autoComplete="off"/>
      <ul className="suggestions-list" id="suggestions-list">{this.state.suggestionList}</ul>
      </div>
    );
  }
}
