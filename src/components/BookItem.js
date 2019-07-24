import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class BookItem extends Component {
  state = {
    imgUrl: '',
    author: '',
    isLoaded: false
  }

  async componentDidMount() {
    const { featured_media, author } = this.props.book;
    try {
      const getImageUrl = await axios.get(`http://localhost:8000/wp-json/wp/v2/media/${featured_media}`);
      const getAuthor = await axios.get(`http://localhost:8000/wp-json/wp/v2/users/${author}`);
      this.setState({
        imgUrl: getImageUrl.data.media_details.sizes.full.source_url,
        author: getAuthor.data.name,
        isLoaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { id, title, excerpt } = this.props.book;
    const { author, imgUrl, isLoaded } = this.state;
    if (!isLoaded) {
      return null;// <h3>Loading ...</h3>
    }
    return (
      <div className="card">
        <h2>{title.rendered}</h2>
        <small>
          Review by <strong>{author}</strong>
        </small>
        <img style={{ width: '550px', height: '300px' }} src={imgUrl} alt={title.rendered} />
        <p dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
        <Link to={`/book/${id}`}>Read review</Link>
      </div>
    )
  }
}

export default BookItem;
