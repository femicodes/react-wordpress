import React, { Component } from 'react';
import BookItem from './BookItem';
import axios from 'axios';

export class Books extends Component {
  state = {
    books: [],
    isLoaded: false
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/wp-json/wp/v2/books')
      .then(res => this.setState({
        books: res.data,
        isLoaded: true
      }))
      .catch(err => console.error(err));
  }

  render() {

    const { books, isLoaded } = this.state;
    if (!isLoaded) {
      return <h3>Loading ...</h3>
    }
    return (
      <div>
        {books.map(book => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    );
  }
}

export default Books;
