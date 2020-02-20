import React, { Component }from 'react';
// import FormUserDetails from './FormUserDetails';

  class ReviewForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 3,
        review: ''
      }
    }

    handleChange = (event) => {
      console.log(event.target.value)
      console.log(event.target.name)
      this.setState({ [event.target.name]: event.target.value })
    }


    render () {
      return (
        <div>
        <h1> Review </h1>
          <form>
            <label> Rating: </label>
            <input name="rating" type="range" min="0" max="5" value={this.state.rating} onChange={this.handleChange}/>
            <p>{this.state.rating}</p>

            <label> Review: </label>
            <textarea name="review" value={this.state.review} onChange={this.handleChange}/>
            <button> Submit </button>

          </form>
        </div>
      )
    }
  }




  export default ReviewForm;
