/** @jsx jsx **/
import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'

// Custom component imports
import WorkspaceSlider from './WorkspaceSlider'
import Slide from './Slide';
import Arrow from './Arrow'
import Dots from './Dots'
import OutsideClick from '../OutsideClick/OutsideClick.js'

// Styling imports
import './ListView.scss'

<<<<<<< HEAD
=======

/**
* @function ListView
 **/
>>>>>>> 2e0ba2ae55ad22cb0d9ac07819016ee83aec2b60
const ListView = props => {
  const [listOpen, setListOpen] = useState(false)
  const [slider, setSlider] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.5
  })
  const [width, setWidth] = useState()

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Reference and function that listens for events outside of the ListView component, and closes it
  const ref = useRef()

  OutsideClick(ref, () => {
    setListOpen(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Gets the dynamic width of the ListView component
  const sliderWidth = useRef()

  useEffect(() => {
    setWidth(sliderWidth.current.getBoundingClientRect().width)
  }, [])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Function to advance/decrement the slides
  const { translate, transition, activeIndex } = slider

  const nextSlide = () => {
  if (activeIndex === props.workspaces[0].length - 1) {
    return setSlider({
      ...slider,
      translate: 0,
      activeIndex: 0
    })
  }

  setSlider({
    ...slider,
    activeIndex: activeIndex + 1,
    translate: (activeIndex + 1) * width
  })
}

const prevSlide = () => {
  if (activeIndex === 0) {
    return setSlider({
      ...slider,
      translate: (props.workspaces[0].length - 1) * width,
      activeIndex: props.workspaces[0].length - 1
    })
  }

  setSlider({
    ...slider,
    activeIndex: activeIndex - 1,
    translate: (activeIndex - 1) * width
  })
}
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  return (
    <Container className='list-container' fluid id={visible}>
      <Row className='list-row'>
        <Col className='list-column' sm={6} md={5} lg={4} ref={ref}>
          <div className='list-header' onClick={toggleListView} >
            <p>List View</p>
          </div>
          <div className='list-content' css={sliderCSS} ref={sliderWidth}>

            <WorkspaceSlider
              translate={translate}
              transition={transition}
              width={width * props.workspaces[0].length}
            >

              {props.workspaces[0].map((workspace) => (
                <Slide key={workspace.id} content={workspace} activeIndex={activeIndex} width={width} />
              ))}

            </WorkspaceSlider>

            <Dots slides={props.workspaces[0]} width={width} activeIndex={activeIndex}/>

          </div>
          <Arrow direction='left' handleClick={prevSlide} />
          <Arrow direction='right' handleClick={nextSlide} />
        </Col>
      </Row>
    </Container>
  )
}

const sliderCSS = css`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

export default ListView;
