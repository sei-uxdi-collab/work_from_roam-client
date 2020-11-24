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
    const { toggleSignIn, toggleSignUp, isSignInOpen, isSignUpOpen, redirect, setApp } = this.props

    return (
      <div className="full-width">
        <Row className="m-0 p-0 d-flex justify-content-around">
          <div className="box-controller">
           <div
             className={isSignInOpen
             ? " controller selected-controller"
             : "controller"}
             onClick={toggleSignIn}>
             Login
           </div>
           <div
             className={isSignUpOpen
             ? "controller selected-controller"
             : "controller"}
             onClick={toggleSignUp}>
             Sign Up
           </div>
         </div>
       </Row>

       <Row className="m-0 p-0">
        <div className="box-container">
          {isSignInOpen && <HeaderSignIn user={this.props.user} alert={this.props.barAlert} setUser={this.props.setUser} setApp={setApp} redirect={redirect}/>}
          {isSignUpOpen && <HeaderSignUp user={this.props.user} alert={this.props.barAlert} setUser={this.props.setUser} setApp={setApp} redirect={redirect}/>}
        </div>
      </Row>
    </div>
    );
  }

}

export default HeaderAuthOptions
