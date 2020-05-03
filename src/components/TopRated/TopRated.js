import React, { useState, useRef, useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { StarRating } from '../Review/StarsRating'
import "./TopRated.scss";
import axios from 'axios'
import apiUrl from '../../apiConfig'

function TopRated(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [workplaces, setWorkplaces] = useState([])

  const content = useRef(null);

  console.log(props)

  function toggleView() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  useEffect(() => {
      axios({
        url: apiUrl + '/work_spaces/top_rated',
        method: 'GET',
        headers: {
          'Authorization': `Token token=${props.user.token}`
        }
      })
        // .then(response => console.log(response.data))
        .then(response => {
          setWorkplaces(response.data.work_spaces)
        })
        .catch((error) => console.log(error))
    }, [])

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
          <span className="plain-text distance">.5 miles away</span>
        </Row>
        <Row>
          <span className="plain-text address"> {workplace.address}</span>
        </Row>
        <Row>
          <span className="plain-text phone"> Phone: <u> {workplace.phone} </u></span>
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
    <div className="toprated-section"  onClick={toggleView}>
      <div className={`toprated toprated-title ${setActive}`}>
        Top Rated
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
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
