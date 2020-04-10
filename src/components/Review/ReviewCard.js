import React from "react"
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { StarRating } from './StarsRating'
import image from '..././../public/image_not_found.png'


class MyReview extends React.Component {
  constructor() {
    super()
    this.state = {
        name: '',
        rating: 3,
        note:'',
        distance: '',
        hours: '',
        address: '',
        image_url: ''

    }
    this.handleChange = this.handleChange.bind(this);
  }
handleChange(event) {
    const { name, value } = event.targe;
    this.setState({
      [name]: value
    });
  }

render() {
    return (
       <div>
        <form className="review-card">
          <input
            name="name"
            value={this.state.name}
            onChanging={this.handleChange}
            placeholder="Place Name"
          />
          <br />

          <input
            name="note"
            value={this.state.note}
            onChanging={this.handleChange}
            placeholder="Review Note"
          />
          <br />
          <img src={image} alt="image_not_found.png" />

          </form>
              </div>

        // <h1>Good {this.state.name}</h1>
        // <h5>note {this.state.note}</h5>

    );
  }
}

export default MyReview
