import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Book extends Component {

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount () {
    let url = 'https://www.googleapis.com/books/v1/volumes/';
    let id = this.props.location.pathname.split('/')[2]

    axios.get(url + id).then(response => {
      console.log(response);
      let book = response.data

      this.setState({
        book: book,
        title: book.volumeInfo.title,
        image: book.volumeInfo.imageLinks.smallThumbnail,
        author: book.volumeInfo.authors[0],
        description: {__html: book.volumeInfo.description},
        categories: book.volumeInfo.categories
      });
    });
  }

  render() {
    return (
      <div className="book-container">
      <Link to="/" className="back-button">Terug</Link>
      <table>
        <td className="book-td">
          <img src={this.state.image} className="book-image"/>
        </td>
        <td className="book-td book-text-td">
          <p className="book-author">{this.state.author}</p>
          <p className="book-title">{this.state.title}</p>
          <p>{this.state.categories}</p>

        </td>
      </table>

        <h2>Samenvatting</h2>
        <div dangerouslySetInnerHTML={this.state.description}></div>
      </div>
    );
  }
}
