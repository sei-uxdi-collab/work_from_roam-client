import React, { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { showUser } from '../../api/auth'
import { Link, withRouter } from 'react-router-dom'
import './Header.scss'
import Info from "../Info/Info";
import TopRated from "../TopRated/TopRated";
import MyFavorites from "../MyFavorites/MyFavorites";
import MyReviews from "../MyReviews/MyReviews";
import Settings from "../Settings/Settings";
import HeaderAuthOptions from "../HeaderAuthOptions/HeaderAuthOptions";
import { getGooglePlaceDetails } from '../../helpers/googlePlaceDetails'
import { avatar } from '../../helpers/avatarsArray'

const Header = ({ user, userLocation, allData, setApp, setUser, google, map, history, barAlert, redirect }) => {
  const [expanded, setExpanded] = useState({
    favorites: false,
    reviews: false,
    topRated: false,
    info: false,
    settings: false,
    signIn: !user,
    signUp: false
  })

  useEffect(() => {
    if (user) {
      showUser(user)
      .then(res => setUser(res.data.user))
      .catch(console.error)
    }
  }, [])

  const toggleExpand = section => {
    const newState = !expanded[section]
    setExpanded({
      favorites: false,
      reviews: false,
      topRated: false,
      info: false,
      settings: false,
      signIn: false,
      signUp: false,
      [section]: newState
    })
  }

  const expandByKey = (key) => setExpanded(prevState => ({ ...prevState, [key]: !prevState[key] }))

  const showWorkspace = (id, placeId) => {
    const callback = placeData => {
      setApp({ placeData })
    }
    const currentWorkspace = allData.find(workspace => workspace.id === id)
    const { lat, lng } = currentWorkspace
    const mapCenter = { lat, lng }

    getGooglePlaceDetails(google, map, placeId, callback)
    setApp({ currentWorkspace, mapCenter })
    history.push('/workspace')
  }

  return (
    <div className="header" fixed="top">
      <Row>
        <Link to='/' className="p-0">
          <img src="close-x-white.png" className="close-x-white" alt="close"/>
        </Link>
        {user ? (
          <div className="d-flex mb-2" style={{ width: "100%"}}>
            <div className="user-avatar">
              <a href="#avatar">
                { user && user.avatar ? <img src={avatar(user.avatar)} className="prof-pic" alt="profile pic"/> : <img src={avatar(25)} className="prof-pic" alt="profile pic" /> }
              </a>
            </div>
            <div className="ml-4">
              <Row>
                <div><span className="welcome" title={`Welcome back, ${user && (user.username || user.email)}`}>Welcome back, {user && (user.username || user.email)}</span></div>
              </Row>
            </div>
          </div>
        ) : (
          <HeaderAuthOptions
            barAlert={barAlert}
            setUser={setUser}
            toggleSignIn={() => toggleExpand('signIn')}
            toggleSignUp={() => toggleExpand('signUp')}
            isSignInOpen={expanded.signIn}
            isSignUpOpen={expanded.signUp}
            redirect={redirect}
            setApp={setApp}
          />
        )}
      </Row>

      {user && (
        <Row>
          <div>
            <img src="your-favorites-heart-icon.png" className="icon" alt="Your Favorites"/>
          </div>
          <MyFavorites
            user={user}
            userLocation={userLocation}
            isExpanded={expanded.favorites}
            toggleExpand={() => toggleExpand('favorites')}
            showWorkspace={showWorkspace}
          />
        </Row>
      )}

      {user && (
        <Row>
          <div>
            <img src="my-reviews-icon.png" className="icon" alt="My Reviews"/>
          </div>
          <MyReviews
            user={user}
            isExpanded={expanded.reviews}
            toggleExpand={() => toggleExpand('reviews')}
            allData={allData}
            setApp={setApp}
            showWorkspace={showWorkspace}
          />
        </Row>
      )}

      <Row>
        <div>
          <img src="top-rated-star-icon.png" className="icon" alt="Top Rated"/>
        </div>
        <TopRated
          user={user}
          userLocation={userLocation}
          isExpanded={expanded.topRated}
          toggleExpand={() => toggleExpand('topRated')}
          showWorkspace={showWorkspace}
        />
      </Row>

      {user ? (
        <Row>
          <div>
            <img src="settings-icon.svg" className="icon" alt="Settings"/>
          </div>
          <Settings isExpanded={expanded.settings} toggleExpand={() => toggleExpand('settings')}/>
        </Row>
      ) : (
        <Row>
          <div>
            <img src="info-icon.png" className="icon" alt="info"/>
          </div>
          <Info
            title="Info"
            content="This is our app info: It's great! That's all you need to know."
            isExpanded={expanded.info}
            toggleExpand={() => expandByKey('info')}
          />
        </Row>
      )}

      {user && (
        <div>
          <a className="btn sign-out" href="#sign-out" role="button">Sign Out</a>
        </div>
      )}
    </div>
  )
}
export default withRouter(Header)
