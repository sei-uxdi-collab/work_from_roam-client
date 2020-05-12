import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import AutoAlert from '../AutoAlert/AutoAlert.js'
import Avatar from '../Avatar/Avatar'
import BarAlert from '../BarAlert/BarAlert'
import Search from '../Search/Search'
import GoogleMap from '../GoogleMap/GoogleMap'
import ReviewCreate from '../Review/ReviewCreate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import ChangePassword from '../ChangePassword/ChangePassword'
import SignOut from '../SignOut/SignOut'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import WorkSpace from '../WorkSpace/WorkSpace'
import WorkSpaceCreate from '../WorkSpace/WorkSpaceCreate.js'
import ListView from '../ListView/ListView'
// import WorkspaceFilter from '../WorkspaceFilter/WorkspaceFilter'

import './App.scss'


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
      workSpaceId: null,
      currentWorkspace: null,
      user: null,
      userLocation: null,
      alerts: [],
      barAlerts: [],
      filteredWorkspaces: [],
    }

    // Allows the WorkspaceFilter component to update filteredWorkspaces[]
    this.filteredWorkspaces = this.filterWorkspaces.bind(this)
  }

  // Function bound to filteredWorkspaces state, passed in to the WorkspaceFilter component as props
  filterWorkspaces = workspaces => {
    this.setState({ filteredWorkspaces: workspaces})
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant, image }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant, image }] })
  }

  barAlert = ({ heading, message, variant, image }) => {
    this.setState({ barAlerts: [...this.state.barAlerts, { heading, message, variant, image }] })
  }

  render() {
    const { alerts, barAlerts, user } = this.state

    return (
<div>
<Fragment>

        {alerts.map((alert, index) => (
            <AutoAlert
              key={index}
              heading={alert.heading}
              variant={alert.variant}
              message={alert.message}
              image={alert.image}
            />
          ))}

          {barAlerts.map((barAlert, index) => (
              <BarAlert
                key={index}
                heading={barAlert.heading}
                variant={barAlert.variant}
                message={barAlert.message}
                image={barAlert.image}
              />
            ))}

        <Route path='/create-review'>
          <ReviewCreate
            user={user}
            alert={this.alert}
            placeId={this.state.placeId}
            placeData={this.state.placeData}
            location={this.state.poiLocation}
            data={this.state.allData}
            currentWorkspace={this.state.currentWorkspace}
            setApp={this.setState.bind(this)}
          />
        </Route>

        <Route path='/workspace' render={() => (
           <WorkSpace
              user={user}
              data={this.state.currentWorkspace}
              placeData={this.state.placeData}
              userLocation={this.state.userLocation}
            />
         )} />

        <Route path='/sign-up' render={() => (
           <SignUp alert={this.alert} setUser={this.setUser} />
         )} />

         <Route path='/sign-in' render={() => (
            <SignIn user={user} alert={this.barAlert} setUser={this.setUser} />
          )} />

          <Route user={user} path='/change-password' render={() => (
              <ChangePassword user={user} alert={this.alert} />
            )} />

          <Route user={user} path='/sign-out' render={() => (
              <SignOut clearUser={this.clearUser} alert={this.barAlert} user={user} />
            )} />

          <Route user={user} path='/nav' render={() => (
              <Header clearUser={this.clearUser} user={user} />
            )} />

            <Route user={user} path='/create-workspace' render={() => (
            <WorkSpaceCreate
              user={user}
              placeId={this.state.placeId}
              placeData={this.state.placeData}
              workspaceLocation={this.state.poiLocation}
              setApp={this.setState.bind(this)}
            />
          )} />

        <Route user={user} path='/avatar' render={() => (
          <Avatar user={user} setApp={this.setState.bind(this)}/>
        )} />

        <Route path='/'>
          <div className="App">
            <div className='search-group'>
              <NavBar />
              <Search setApp={this.setState.bind(this)}
                      mapCenter={this.state.mapCenter}
                      filterWorkspaces={this.filterWorkspaces}
                      data={this.state.allData}
              />
            </div>
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
              currentWorkspace={this.state.currentWorkspace}
            />
          <ListView workspaces={[this.state.filteredWorkspaces]} />
          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App
