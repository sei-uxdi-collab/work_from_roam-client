/** @jsx jsx **/
import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'

// Custom component imports
import WorkspaceSlider from './WorkspaceSlider'
import Slide from './Slide'
import Arrow from './Arrow'
import OutsideClick from '../OutsideClick/OutsideClick.js'

// Styling imports
import './ListView.scss'

const ListView = props => {
  const getWidth = e => {
    if (e) {
      let width = e.getBoundingClientRect().width
      console.log(width)
    }
  }

  const [listOpen, setListOpen] = useState(false)
  const [slider, setSlider] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.5
  })


  // Reference and function that listens for events outside of the ListView component, and closes it
  const ref = useRef()

  OutsideClick (ref, () => {
    setListOpen(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Sets the state of the Container ID to trigger showing/hiding of component
  let visible = 'hide'

  if (listOpen === true) {
    visible = 'show'
  }

  const toggleListView = () => {
    setListOpen(!listOpen)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const { translate, transition, activeIndex } = slider

  const nextSlide = () => {
    if (activeIndex === props.filteredWorkspaces.length -1 ) {
      return setSlider({
        ...slider,
        translate: 0,
        activeIndex: 0
      })
    }

    setSlider({
      ...slider,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setSlider({
        ...slider,
        translate: (props.filteredWorkspaces.length - 1) * getWidth(),
        activeIndex: props.filteredWorkspaces.length -1
      })
    }

    setSlider({
      ...slider,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - -1) * getWidth()
    })
  }

  return (
      <Container className='list-container' fluid id={visible} >
        <Row className='list-row'>
          <Col className='list-column' sm={6} md={5} lg={4} ref={ref}>
            <div className='list-header' onClick={toggleListView}>
              <p>List View</p>
            </div>
            <div css={sliderCSS} ref={getWidth}>
              <WorkspaceSlider
                translate={translate}
                transition={transition}
                width={getWidth() * props.filteredWorkspaces.length}
              >
                {props.filteredWorkspaces[0].map((slide, i) => (
                  <Slide key={slide + i} content={slide} />
                ))}
              </WorkspaceSlider>

              <Arrow direction='left' handleClick={prevSlide} />
              <Arrow direction='right' handleClick={nextSlide} />
            </div>
          </Col>
        </Row>
      </Container>
  )
}

const sliderCSS = css`
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  margin: .25rem auto;
  overflow: hidden;
  position: relative
`

export default ListView
