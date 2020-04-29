import React, { useState, useRef } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import { Row } from 'react-bootstrap';
// import TopRatedCard from "./TopRatedCard"
import "./TopRated.scss";

function TopRated(props) {
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
  
  const workspaceArray = props.workspaces[0].slice(0, 5)

  const topRatedJsx = workspaceArray.map(workplace => (
    <ListGroup.Item
      key={workplace.id}
      action
      href={`#workplace/${workplace.id}`}
    >
    <div className="top-rated-card">
      <div className="card-content">
        <Row>
          <span className="workplace-title"> {workplace.name}</span>
          <span className="top-rated-stars"> ★★★★★</span>
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
    </ListGroup.Item>
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
      <ListGroup>
        {topRatedJsx}
      </ListGroup>
      </div>
    </div>
  );
}

export default TopRated;
