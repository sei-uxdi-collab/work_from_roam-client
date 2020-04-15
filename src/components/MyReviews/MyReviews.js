import React from "react"
import ReviewCard from '../ReviewCard/ReviewCard';
// import image from '..././../public/image_not_found.png'


class MyReviews extends React.Component {
  constructor() {
    super()

  }

  render() {

    // console.log({ 'this.props': this.props });

    // const myReviewData = this.props.myReviewsData[0].user.reviews;

    const myReviewData = [ this.props.allData[28] ];

    console.log({ myReviewData });

    return (
      <div className='MyReviews'>
       {myReviewData.map(
         function(el, i) {

           const { name, rating, note, lat, lng, address, photo } = el;
           console.log({ name, rating, note, lat, lng, address, photo });
           return <ReviewCard value={rating} note={note} address={address}
            imageUrl={photo} review={{
                     work_space: {
                       name: name,
                       rating: rating,
                       note: note,
                       distance: 'distanceInMiles',
                       hours:'7am-5pm',
                       address: address,
                       image_url:''
                     }
                   }}
                   lat={lat}
                   lng={lng}
             />
         }
       )}
    </div>
    );
  }
}

export default MyReviews;
