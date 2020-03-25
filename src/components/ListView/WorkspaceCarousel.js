import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const WorkspaceCarousel = props => {
  return (
    <Carousel className='workspace-carousel'>
      <Carousel.Item>
       <img src="../../../public/Roman.png" alt='Rome' />
      </Carousel.Item>
    </Carousel>
  )
}

export default WorkspaceCarousel
