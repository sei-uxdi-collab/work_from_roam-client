import React, { Fragment } from 'react';
import '../App.css';
import Search from './Search'
import GoogleMap from './GoogleMap';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import Header from './Header/Header'
import { Route } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      coordinates: {
        lat: null,
        lng: null
      },
      user: null,
      placeData: '',
      userLocation: { lat: 42.3601, lng: -71.0589}
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })


  render() {

    const { user } = this.state

    return (
<div>
<Fragment>
<Header user={user} />

        <Route path='/new/:placeId'>
          <ReviewForm />
        </Route>

        <Route path='/sign-up' render={() => (
           <SignUp setUser={this.setUser} />
         )} />

         <Route path='/sign-in' render={() => (
            <SignIn user={user} setUser={this.setUser} />
          )} />

        <Route path='/'>
          <div className="App">

            <Search setApp={this.setState.bind(this)}/>

            <GoogleMap
              initialCenter={this.state.userLocation}
              coordinates={this.state.coordinates}
              placeData={this.state.placeData}
            />

          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App
