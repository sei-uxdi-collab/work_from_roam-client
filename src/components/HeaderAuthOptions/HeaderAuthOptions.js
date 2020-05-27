import React, { Component } from 'react'
import HeaderSignIn from "./HeaderSignIn/HeaderSignIn";
import HeaderSignUp from "./HeaderSignUp/HeaderSignUp";
import { Row } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import './HeaderAuthOptions.scss'

class HeaderAuthOptions extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isSignInOpen: true,
      isSignUpOpen: false
    };
  }

  showSignInBox() {
    this.setState({isSignInOpen: true, isSignUpOpen: false});
  }

  showSignUpBox() {
    this.setState({isSignUpOpen: true, isSignInOpen: false});
  }

  render() {


    return (
      <div className="full-width">
        <Row className="m-0 p-0 d-flex justify-content-around">
          <div className="box-controller">
           <div
             className={this.state.isSignInOpen
             ? " controller selected-controller"
             : "controller"}
             onClick={this
             .showSignInBox
             .bind(this)}>
             Login
           </div>
           <div
             className={this.state.isSignUpOpen
             ? "controller selected-controller"
             : "controller"}
             onClick={this
             .showSignUpBox
             .bind(this)}>
             Sign Up
           </div>
         </div>
       </Row>

       <Row className="m-0 p-0">
        <div className="box-container">
          {this.state.isSignInOpen && <HeaderSignIn user={this.props.user} alert={this.props.barAlert} setUser={this.props.setUser}/>}
          {this.state.isSignUpOpen && <HeaderSignUp user={this.props.user} alert={this.props.barAlert} setUser={this.props.setUser}/>}
        </div>
      </Row>
    </div>
    );
  }

}

export default HeaderAuthOptions
