import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import AutoAlert from '../AutoAlert/AutoAlert.js'
import Avatar from '../Avatar/Avatar'
import BarAlert from '../BarAlert/BarAlert'
import Search from '../Search/Search'
import GoogleMap from '../GoogleMap/GoogleMap'
import ReviewCreate from '../Review/ReviewCreate'
import ReviewUpdate from '../Review/ReviewUpdate'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SplashPage from '../SplashPage/SplashPage'
import ChangePassword from '../ChangePassword/ChangePassword'
import SignOut from '../SignOut/SignOut'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import WorkSpace from '../WorkSpace/WorkSpace'
import WorkSpaceCreate from '../WorkSpace/WorkSpaceCreate.js'
import ListView from '../ListView/ListView'
import orderBy from 'lodash/orderBy'

import './App.scss'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      allData: [],
      poiLocation: null,
      google: null,
      map: null,
      mapCenter: { lat: 42.3600, lng: -71.0589 },
      bounds: null,
      placeId: null,
      placeData: null,
      searchLocation: null,
      workSpaceId: null,
      currentWorkspace: null,
      currentReview: null,
      user: null,
      userLocation: { lat: 42.3601, lng: -71.0589 },
      alerts: [],
      barAlerts: [],
      filteredWorkspaces: [],
    }

    // Allows the WorkspaceFilter component to update filteredWorkspaces[]
    this.filteredWorkspaces = this.filterWorkspaces.bind(this)
    this.filteredWorkspaces = this.sortWorkspaces.bind(this)
  }

  // Functions bound to filteredWorkspaces state
  filterWorkspaces = workspaces => {
    this.setState({ filteredWorkspaces: workspaces})
  }

  sortWorkspaces = selection => {
    switch (selection) {
      case 'avg_rating':
        this.setState({filteredWorkspaces: orderBy(this.state.filteredWorkspaces, [selection, 'distance'], ['desc', 'asc'])})
        break
      case 'avg_wifi':
        this.setState({filteredWorkspaces: orderBy(this.state.filteredWorkspaces, [selection, 'avg_rating'], ['desc', 'desc'])})
        break
      case 'avg_noise':
        this.setState({filteredWorkspaces: orderBy(this.state.filteredWorkspaces, [selection, 'avg_rating'], ['asc', 'desc'])})
        break
      case 'distance':
        this.setState({filteredWorkspaces: orderBy(this.state.filteredWorkspaces, [selection, 'avg_rating'], ['asc', 'desc'])})
        break
      default:
        console.log('Sort failed!')
    }
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
              <Header
                clearUser={this.clearUser}
                user={user}
                userLocation={this.state.userLocation}
                allData={this.state.allData}
                setUser={this.setUser}
                setApp={this.setState.bind(this)}
                google={this.state.google}
                map={this.state.map}
                barAlert={this.barAlert}/>
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
          <Avatar user={user} setUser={this.setUser}/>
        )} />

        <Route user={user} path='/reviews/:id/update' render={() => (
          <ReviewUpdate
            user={user}
            setUser={this.setUser}
            setApp={this.setState.bind(this)}
            currentReview={this.state.currentReview}
            currentWorkspace={this.state.currentWorkspace}
            alert={this.alert}
          />
        )} />

        <Route path='/'>
          <SplashPage />
          <div className="App">
            <div className='search-group'>
              <NavBar />
              <Search setApp={this.setState.bind(this)}
                      mapCenter={this.state.mapCenter}
                      filterWorkspaces={this.filterWorkspaces}
                      data={this.state.allData}
                      userLocation={this.state.userLocation}
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
              google={this.state.google}
              map={this.state.map}
            />
          <ListView
            workspaces={[this.state.filteredWorkspaces]}
            sortWorkspaces={this.sortWorkspaces}
          />
          </div>
        </Route>
      </Fragment>
      </div>


    )
  }
}

export default App
