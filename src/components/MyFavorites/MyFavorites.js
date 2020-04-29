import React, { useState, useRef } from "react";
import { Row, Col } from 'react-bootstrap';

import "./MyFavorites.scss";

function MyFavorites(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  const content = useRef(null);

  function toggleView() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  console.log(props)

  const myFavoritesJsx = props.user.favorites.map(workplace => (
    <li
      key={workplace.id}
      action
      href={`#workplace/${workplace.id}`}
    >
    <div className="my-favorite-card">
      <div className="card-content">
        <Row>
          <Col xs={7}>
            <div className="workplace-title"> {workplace.name}</div>
          </Col>
          <Col>
            <div className="my-favorite-stars"> ★★★★★</div>
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
          <span className="plain-text phone"> Phone: <u>{workplace.phone}</u></span>
        </Row>
        <Row>
          <span className="plain-text bars"> Wifi Quality </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Seat Comfort </span>
        </Row>
        <Row>
          <span className="plain-text bars"> Noise Level </span>
        </Row>
      </div>
    </div>
    </li>
  ))

  return (
    <div className="myfavorites-section"  onClick={toggleView}>
      <div className={`myfavorites myfavorites-title ${setActive}`}>
        My Favorites
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="myfavorites-content"
      >
      <ul>
        {myFavoritesJsx}
      </ul>
      </div>
    </div>
  );
}

export default MyFavorites;
