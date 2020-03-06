import React, { Fragment } from 'react';
import './App.css';
import Search from './components/Search/Search'
import GoogleMap from './components/GoogleMap/GoogleMap';
import ReviewForm from './components/ReviewForm/ReviewForm';
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import ChangePassword from './components/ChangePassword/ChangePassword'
import SignOut from './components/SignOut/SignOut'
import Header from './components/Header/Header'
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import WorkSpace from './components/WorkSpace/WorkSpace'
import SuggestionsList from './components/SuggestionsList/SuggestionsList.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allData: [],
      poiLocation: null,
      mapCenter: { lat: 42.3601, lng: -71.0589},
      bounds: null,
      placeId: null,
      placeData: null,
      searchLocation: null,
      //

      user: null,
      userLocation: null,

    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })


  render() {

    const { user } = this.state

    return (
<div>
<Fragment>

        <Route path='/new'>
          <ReviewForm
            user={user}
            placeId={this.state.placeId}
            placeData={this.state.placeData}
            location={this.state.poiLocation}
          />
        </Route>

        <Route path='/workspace' render={() => (
           <WorkSpace
              data={this.state.currentWorkspace}
              placeData={this.state.placeData}
        />
         )} />

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

          <Route user={user} path='/nav' render={() => (
              <Header clearUser={this.clearUser} user={user} />
            )} />

          <Route user={user} exact path='/suggestions' render={() => (
              <SuggestionsList data={this.state.allData} />
            )} />

        <Route path='/'>
          <div className="App">
            <NavBar />
            <Search setApp={this.setState.bind(this)}
                    mapCenter={this.state.mapCenter}
            />
            <GoogleMap
              center={this.state.mapCenter}
              coordinates={this.state.coordinates}
              placeData={this.state.placeData}
              //
              setApp={this.setState.bind(this)}
              allData={this.state.allData}
              mapCenter={this.state.mapCenter}
              poiLocation={this.state.poiLocation}
              searchLocation={this.state.searchLocation}
              userLocation={this.state.userLocation}
            />

          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App
