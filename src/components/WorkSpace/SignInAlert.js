import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Row } from 'react-bootstrap'
import './SignInAlert.scss'

const SignInAlert = () => {


    return (
        <div className='sign-in-alert-container'>
            <Link to='/' className='close-window'>
                <img src="close-x-black.svg" alt="close"/>
            </Link>
            <div className='message-container'>
                <span className='message-greeting'>Hey there!</span>
            <Row>
                <span className='message-content'>Log in to your account to leave a review, save your favorites and more!</span>
            </Row>
            </div>
                <div className='button-group'>
                    <Button 
                        className='sign-in-button'
                        href='#/nav'>
                            Log In
                    </Button>
                    <Button 
                        className='create-acct-button'
                        href='#/nav'
                        signUp='true'>
                            Create Account
                    </Button>
                </div>
                
        </div>
    )
}

export default SignInAlert