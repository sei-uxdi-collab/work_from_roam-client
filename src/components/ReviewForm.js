import React from 'react';
import './ReviewForm.css'
import { Link, Redirect } from 'react-router-dom'

  class ReviewForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rating: 3,
        review: '',
        show: true,
        redirect: false
      }
    }

    handleChange = (event) => {
      console.log(event.target.value)
      console.log(event.target.name)
      this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      if (!this.props.user) {
        this.setState({redirect: true})
      }
      
    }

    closeWindow = () => {
      this.setState({ show: false })
    }

    render () {
      if (!this.props.user) {
        return (<Redirect to='/sign-in'/>)
      }
      let show = 'block'
        if (!this.state.show) {
          show = 'none'
        }
      return (
          <div className='review-form' style={{display: show}}>

          <Link to='/'>
            <button style={{float: 'right'}} onClick={this.closeWindow}>Close</button>
          </Link>

          <h1> Review </h1>

            <form onSubmit={this.handleSubmit}>

              <label> Rating: </label>
              <input name="rating" type="range" min="0" max="5" value={this.state.rating} onChange={this.handleChange}/>
              <p>{this.state.rating}</p>

              <label> Review: </label>
              <textarea name="review" value={this.state.review} onChange={this.handleChange} required/>
              <button> Submit </button>

            </form>
          </div>
      )
    }
  }




  export default ReviewForm;
