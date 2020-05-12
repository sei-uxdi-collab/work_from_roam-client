import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { StarRating } from '../Review/StarsRating'
import "./TopRated.scss";
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { calculateDistanceMiles } from '../../helpers/calculateDistance.js'

function TopRated(props) {
  const { user, isExpanded, toggleExpand } = props
  const [workplaces, setWorkplaces] = useState([])

  const content = useRef(null);
  const maxHeight = isExpanded ? `${content.current.scrollHeight}px` : "0px"


  console.log(props)

  useEffect(() => {
      axios({
        url: apiUrl + '/work_spaces/top_rated',
        method: 'GET',
        headers: {
          'Authorization': `Token token=${user.token}`
        }
      })
        // .then(response => console.log(response.data))
        .then(response => {
          setWorkplaces(response.data.work_spaces)
        })
        .catch((error) => console.log(error))
    }, [])

  const formatPhone = function(phone) {
    return "tel:" + phone.replace(/[ ()\\s-]+/g, "")
  }

  const topRatedJsx = workplaces.map(workplace => (
    <li
      key={workplace.id}
      action
      href={`#workplace/${workplace.id}`}
    >
    <div className="top-rated-card">
      <div className="card-content">
        <Row>
          <Col xs={7}>
            <div className="workplace-title"> {workplace.name}</div>
          </Col>
          <Col>
            <div className="top-rated-stars">
              <StarRating
               value={workplace.avg_rating}
               emptyStarColor='#FFFFFF'
               editing={false}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <div className="open-now">Open Now</div>
          <span className="plain-text distance"> {calculateDistanceMiles()}</span>
        </Row>
        <Row>
          <span className="plain-text address"> {workplace.address}</span>
        </Row>
        <Row>
          <span className="plain-text phone"> Phone: {workplace.phone ? <u><a href={formatPhone(workplace.phone)}>{workplace.phone}</a></u> : "Not Available"}</span>
        </Row>
        <Row>
          <span className="plain-text bars"> Wifi Quality: {workplace.avg_wifi} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Seat Comfort: {workplace.avg_seating} </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Noise Level: {workplace.avg_noise} </span>
        </Row>
      </div>
    </div>
    </li>
  ))

  return (
    <div className="toprated-section"  onClick={toggleExpand}>
      <div className={`toprated toprated-title ${isExpanded ? 'active' : ''}`}>
        Top Rated
      </div>
      <div
        ref={content}
        style={{ maxHeight }}
        className="toprated-content"
      >
      <ul>
        {topRatedJsx}
      </ul>
      </div>
    </div>
  );
}

export default TopRated;
