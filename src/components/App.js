import React, { Fragment } from 'react';
import '../App.css';
import Search from './Search'
import GoogleMap from './GoogleMap';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import ChangePassword from './ChangePassword/ChangePassword'
import SignOut from './SignOut/SignOut'
import Header from './Header/Header'
import { Route } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      poiLocation: null,
      mapCenter: { lat: 42.3601, lng: -71.0589},
      bounds: null,
      placeId: null,
      placeData: null,
      //

      user: null,
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

        <Route path='/new'>
          <ReviewForm
            user={user}
            placeId={this.state.placeId}
            placeData={this.state.placeData}
            location={this.state.poiLocation}
          />
        </Route>

        <Route path='/sign-up' render={() => (
           <SignUp setUser={this.setUser} />
         )} />

         <Route path='/sign-in' render={() => (
            <SignIn user={user} setUser={this.setUser} />
          )} />

          <Route user={user} path='/change-password' render={() => (
              <ChangePassword user={user} />
            )} />

          <Route user={user} path='/sign-out' render={() => (
              <SignOut clearUser={this.clearUser} user={user} />
            )} />


        <Route path='/'>
          <div className="App">

            <Search setApp={this.setState.bind(this)}/>

            <GoogleMap
              center={this.state.mapCenter}
              coordinates={this.state.coordinates}
              placeData={this.state.placeData}
              //
              setApp={this.setState.bind(this)}
              poiLocation={this.state.poiLocation}
            />

          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App
