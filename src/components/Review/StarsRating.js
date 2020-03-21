import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";

export class StarRating extends Component {
  render() {
    const { value, onStarClick, name } = this.props;

    return (
      <StarRatingComponent
        name={name || "name1"}
        starCount={5}
        value={value}
        onStarClick={onStarClick}
      />
    );
  }
}
