import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Review from '../Review/Review'
import { StarRating } from '../Review/StarsRating'
import ScaleRating from './ScaleRating'

import './WorkSpace.scss'

class WorkSpace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filters: false,
            hours: false
        }
    }

    // Function to show more filters
   show = () => {
      this.setState({ filters: true })
    }
    // Function to show less filters
    notshow = () => {
       this.setState({ filters: false })
     }

    showHrs = () => {
      this.setState({ hours: true })
    }

    notShowHrs = () => {
      this.setState({ hours: false })
    }

    // render information inside an infoWindow for POI
    render() {
      let photo = '../../loading-cat.gif'
      if (this.props.placeData && this.props.placeData.photos) {
        photo = this.props.placeData.photos[0].getUrl()
      } else {
        photo = '../../image_not_found.png'
      }

      if(this.props.data.reviews.length < 1) {
        return (
            <div className='workspace'>
              <Link to='/'>
                <img style={{ float: 'right' }} alt='Click to exit' src={'../../close-x-white.png'}/>
              </Link>
              <div style={{ textAlign: 'center' }}>
                <h3>Be the first to write a  <Button
                data={this.props.data.id}
                href={`#work_spaces/${this.props.data.id}/create-review`}
              >
                Review
              </Button> for</h3>
                <h3>{this.props.placeData && this.props.placeData.name}</h3>
              </div>
            </div>)
      }

    // Function for averaging the different amenities for Review
      let average = function(array) {
        let answer = 0
        let length = array.length
        for(let i = 0; i < array.length; i++) {
          answer += array[i]
        }
        return Math.round(answer/length)
      }
      // Overall average rating for workSpace
      let overall = average(this.props.data.reviews.map(review => review.rating))
      // Outlets average rating
      let outlet = average(this.props.data.reviews.map(review => parseInt(review.outlet)))
      // Coffee average Rating
      let coffee = average(this.props.data.reviews.map(review => parseInt(review.coffee)))
      // Food average rating
      let food = average(this.props.data.reviews.map(review => parseInt(review.food)))

      // Style booleans for showing filter options as being available or not
      let outletStyle = false
      let coffeeStyle = false
      let foodStyle = false

      // Conditionals for showing if filters are available
      if(outlet > 0) {
        // console.log(outlet)
        outletStyle = true
      }
      if(coffee > 0) {
        coffeeStyle = true
      }
      if(food > 0) {
        foodStyle = true
      }

      // Conditionals for determining today's day and showing corresponding opening hours
      let openingHrsToday
      let today = new Date()
      let day = today.getDay()

      if (this.props.placeData && this.props.placeData.opening_hours && day === 0) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[6]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 1) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[0]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 2) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[1]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 3) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[2]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 4) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[3]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 5) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[4]
      } else if (this.props.placeData && this.props.placeData.opening_hours && day === 6) {
        openingHrsToday = this.props.placeData.opening_hours.weekday_text[5]
      }

        return (
            <div className='workspace' style={this.state.display}>
              <Link to='/'>
                <img style={{ float: 'right' }} alt='Click to exit' src={'../../close-x-white.png'} width={'12'} heigth={'12'}/>
              </Link>

                <img className='workspaceImage' accept="*/*" alt="work_space_pic" src={photo} />

                <div className='work-space-div'>
                <div>
                <div className='starRating'>
                <StarRating
                 value={overall}
                 emptyStarColor='#4775FF'
                 editing={false}
                />
                </div>
                  <a
                    className='link'
                    style={{ textDecoration: 'none', color: 'white', fontSize: '17px', fontWeight: '500', lineHeight: '150%' }}
                    href={this.props.placeData && this.props.placeData.website}
                    target='_blank'
                    rel="noopener noreferrer"
                    >
                    {this.props.placeData && this.props.placeData.name}
                    </a>

                    <p>{this.props.placeData && this.props.placeData.formatted_address}</p>
                    <div>
                    {!this.state.hours && (this.props.placeData && this.props.placeData.opening_hours ? <p
                      style={{ cursor: 'pointer' }}
                      onClick={this.showHrs}>{openingHrsToday}<img alt='Click arrow for more hours' src={'../../arrowDwnVec.png'} className='vecStyle'/></p> : <p>Opening hours unavailable</p> )}
                    </div>
                    {this.state.hours &&
                      <div>
                      <p onClick={this.notShowHrs}
                         style={{ cursor: 'pointer' }}><img alt='Click arrow for less hours' src={'../../arrowUpVec.png'} className='vecStyle'/></p>
                        <div>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[0]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[1]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[2]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[3]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[4]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[5]}</p>
                          <p>{this.props.placeData && this.props.placeData.opening_hours.weekday_text[6]}</p>
                        </div>
                      </div>}
                </div>

                <div>
                  <ScaleRating
                    data={this.props.data}
                  />
                  {!this.state.filters && <p
                    style={{ float: 'right', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Roboto' }}
                    onClick={this.show}>more<img alt='Click arrow for more details' src={'../../arrowDwnVec.png'} className='vecStyle' style={{ paddingTop: '3px'}}/></p>}
                  {this.state.filters &&
                    <div>
                      <div style={{ display: 'flex' }}>
                        <p id="outlets" style={{ margin: '10px', display: outletStyle ? 'visible' : 'none' }}>outlets</p>
                        <p id="coffee" style={{ margin: '10px', display: coffeeStyle ? 'visible' : 'none' }}>coffee</p>
                        <p id="food" style={{ margin: '10px', display: foodStyle ? 'visible' : 'none' }}>food</p>
                      </div>
                      <p
                        onClick={this.notshow}
                        style={{ float: 'right', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'Roboto' }}>
                      less<img alt='Click arrow for less details' src={'../../arrowUpVec.png'} className='vecStyle' style={{ paddingTop: '3px'}}/></p>
                    </div>}
                    <Button
                      className='reviewButton'
                      data={this.props.data.id}
                      href={`#work_spaces/${this.props.data.id}/create-review`}
                    >
                      Leave a Review
                    </Button>
                </div>
                <br />
              <hr style={{ visibility: 'hidden', margin: '30px' }} />
                <div style={{ display: 'flex' }}>
                  <div><p style={{ margin: '0px', fontFamily: 'Roboto', fontSize: '16px', fontWeight: 'normal' }}>Reviews({this.props.data.reviews.length})</p></div>
                </div>
                <br />

                <div>
                {this.props.data.reviews.map(review => (
                  <Review
                    user={review.user.email}
                    key={review.id}
                    rating={review.rating}
                    wifi={review.wifi}
                    noise={review.noise}
                    bathroom={review.bathroom}
                    seating={review.seating}
                    outlet={review.outlet}
                    food={review.food}
                    coffee={review.coffee}
                    note={review.note}
                  />
                ))}
                </div>
              </div>

            </div>
        )
    }
}

export default WorkSpace
