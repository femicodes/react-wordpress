import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class BookPage extends Component {
  state = {
    book: {},
    isLoaded: false
  }

  async componentDidMount() {
    try {
      const getId = await axios.get(`http://localhost:8000/wp-json/wp/v2/books/${this.props.match.params.id}`);
      this.setState({
        book: getId,
        isLoaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { book, isLoaded } = this.state;
    if (!isLoaded) {
      return <h3>Loading ...</h3>
    }
    return (
      <Fragment>
        <Link to='/'>Go back</Link>
        <h1>{book.data.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: book.data.content.rendered }} />
      </Fragment>
    )
  }
}

export default BookPage;
