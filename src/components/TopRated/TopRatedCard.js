import React from "react"
import { StarRating } from "../Review/StarsRating"
// import { Card } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import "./TopRatedCard.scss"

class TopRatedCard extends React.Component {
  constructor() {
    super()

  }

render() {

  const {value} = this.props;

    return (
      <div>
      <div className="top-rated-card">
        <div className="card-content">
          <Row>
            <span className="workplace-title"> Starbucks</span>
            <span className="top-rated-stars"> ★★★★★</span>
          </Row>
          <Row>
            <div className="open-now">Open Now</div>
            <span className="plain-text distance">.5 miles away</span>
          </Row>
          <Row>
            <span className="plain-text address"> 1 Financial Center, Boston, MA 02210</span>
          </Row>
          <Row>
            <span className="plain-text phone"> Phone: <u>(555) 555-5555</u></span>
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
      <div className="top-rated-card">
        <div className="card-content">
          <Row>
            <span className="workplace-title"> Starbucks</span>
            <span className="top-rated-stars"> ★★★★★</span>
          </Row>
          <Row>
            <div className="open-now">Open Now</div>
            <span className="plain-text distance">.5 miles away</span>
          </Row>
          <Row>
            <span className="plain-text address"> 1 Financial Center, Boston, MA 02210</span>
          </Row>
          <Row>
            <span className="plain-text phone"> Phone: <u>(555) 555-5555</u></span>
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
      </div>
    );
  }
}

export default TopRatedCard
