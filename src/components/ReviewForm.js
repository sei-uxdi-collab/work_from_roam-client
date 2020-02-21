import React, { Component }from 'react';
import './ReviewForm.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'

  class ReviewForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 3,
        review: '',
        show: true
      }
    }

    handleChange = (event) => {
      console.log(event.target.value)
      console.log(event.target.name)
      this.setState({ [event.target.name]: event.target.value })
    }

    closeWindow = () => {
      this.setState({ show: false })
    }

    render () {
      let show = 'block'
        if (!this.state.show) {
          show = 'none'
        }
      return (
        <Router>
          <div className='review-form' style={{display: show}}>

          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>

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
        </Router>
      )
    }
  }




  export default ReviewForm;
