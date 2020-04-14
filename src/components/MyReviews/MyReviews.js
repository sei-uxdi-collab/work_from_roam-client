import React from "react"
import ReviewCard from '../ReviewCard/ReviewCard';
// import image from '..././../public/image_not_found.png'


class MyReviews extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   name: '',
    //   rating: 3,
    //   note:'',
    //   distance: '',
    //   hours: false,
    //   address: '',
    //   image_url: ''
    //
    // }

  }

  render() {
    const reviewData = [
      { samepl: 1,
        review: {
          work_space: {
            name: 'Sample Review Name',
            rating: 1,
          }
        }
      },
      { rating: 2,
        review: {
          work_space: {
            name: 'Sample Review Name',
            rating: 1,
          }
        }
      },
      { rating: 3,
        review: {
          work_space: {
            name: 'Sample Review Name',
            rating: 1,
          }
        }
      },
      { rating: 4,
        review: {
          work_space: {
            name: 'Sample Review Name',
            rating: 1,
          }
        }
      },
    ]

    return (
      <>
       {reviewData.map(
         function(el, i) {
           return <ReviewCard value={el.rating} review={el.review}/>
         }
       )}
      </>
    );
  }
}

export default MyReviews;
