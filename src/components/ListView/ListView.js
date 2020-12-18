/** @jsx jsx **/
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Dropdown, Container, Row, Col } from 'react-bootstrap'
import { css, jsx } from '@emotion/core'
import { orderBy } from 'lodash'

// Custom component imports
import { Carousel } from './../Carousel/Carousel'
import Slide from './../Carousel/Slide'
import { Arrow } from './../Carousel/Arrow'
import { Dots } from './../Carousel/Dots'
import { ClickOutside } from '../ClickOutside/ClickOutside'

// Styling imports
import './ListView.scss'

const ListView = ({ filteredWorkspaces, setApp }) => {
  const [isListOpen, setIsListOpen] = useState(false)
  const [carousel, setCarousel] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.5
  })
  const [width, setWidth] = useState()

  const workspaceArray = useMemo(() => filteredWorkspaces.slice(0, 5), [filteredWorkspaces])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Reference and function that listens for events outside of the ListView component, and closes it
  const ref = useRef()

  ClickOutside(ref, () => {
    setIsListOpen(false)
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Gets and sets the dynamic width of the carousel component
  const carouselWidth = useRef()

  useEffect(() => {
    setWidth(carouselWidth.current.getBoundingClientRect().width)
  }, [])
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let isVisible = 'hide'

  if (isListOpen === true) {
    isVisible = 'show'
  }

  const toggleListView = () => {
    setIsListOpen(!isListOpen)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to advance/decrement the slides
  const { translate, transition, activeIndex } = carousel

  const nextSlide = () => {
    if (activeIndex === workspaceArray.length - 1) {
      return setCarousel({
        ...carousel,
        translate: 0,
        activeIndex: 0
      })
    }

    setCarousel({
      ...carousel,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * width
    })
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setCarousel({
        ...carousel,
        translate: (workspaceArray.length - 1) * width,
        activeIndex: workspaceArray.length - 1
      })
    }

    setCarousel({
      ...carousel,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * width
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const RenderSlide = array => {
    if (workspaceArray.length === 0) {
      return (
        <div css={placeholderCSS}>
          <p>Please use the Filter button above to filter workspaces!</p>
        </div>
      )
    } else {
      return (
        <Carousel
          translate={translate}
          transition={transition}
          width={width * workspaceArray.length}
        >
          {workspaceArray.map(workspace => (
            <Slide key={workspace.id}
              content={workspace}
              activeIndex={activeIndex}
              toggleListView={toggleListView}
              width={width} />
          ))}
        </Carousel>
      )
    }
  }

  const sortWorkspaces = selection => {
    switch (selection) {
      case 'avg_rating':
        setApp({filteredWorkspaces: orderBy(filteredWorkspaces, [selection, 'distance'], ['desc', 'asc'])})
        break
      case 'avg_wifi':
        setApp({filteredWorkspaces: orderBy(filteredWorkspaces, [selection, 'avg_rating'], ['desc', 'desc'])})
        break
      case 'avg_noise':
        setApp({filteredWorkspaces: orderBy(filteredWorkspaces, [selection, 'avg_rating'], ['asc', 'desc'])})
        break
      case 'distance':
        setApp({filteredWorkspaces: orderBy(filteredWorkspaces, [selection, 'avg_rating'], ['asc', 'desc'])})
        break
      default:
        console.log('Sort failed!')
    }
  }

  return (
    <Container className='list-container' fluid id={isVisible}>
      <Row className='list-row'>
        <Col className='list-column' sm={6} md={5} lg={4} ref={ref}>
          <div className='list-header' onClick={toggleListView} >
            <p>List View</p>
          </div>
          <Dropdown onSelect={eventKey => sortWorkspaces(eventKey)}>
            <Dropdown.Toggle css={dropdownCSS}>
              Sort by...
            </Dropdown.Toggle>
            <Dropdown.Menu css={menuCSS}>
              <Dropdown.Item eventKey='avg_rating'>Highest Rated</Dropdown.Item>
              <Dropdown.Item eventKey='distance'>Closest</Dropdown.Item>
              <Dropdown.Item eventKey='avg_wifi'>Best WiFi</Dropdown.Item>
              <Dropdown.Item eventKey='avg_noise'>Quietest</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div css={carouselCSS} ref={carouselWidth}>
            <RenderSlide array={workspaceArray} />
            <Dots slides={workspaceArray}
              activeIndex={activeIndex}
              margin={10} />
          </div>
          <Arrow direction='left' handleClick={prevSlide} length={workspaceArray.length}/>
          <Arrow direction='right' handleClick={nextSlide} length={workspaceArray.length}/>
        </Col>
      </Row>
    </Container>
  )
}

const dropdownCSS = css`
  color: #000;
  width: 324px;
  background: #fff;
  height: 36px;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 300;
  font-family: 'Roboto'
`

const menuCSS = css`
  border-radius: 18px;
  color: #000;
  background: #fff;
  margin-top: 1em;
  width: 324px;
`

const placeholderCSS = css`
  color: white;
  font-family: 'Roboto';
  margin: auto;
  width: 250px;
`

const carouselCSS = css`
  display: flex;
  height: 100%;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

export default ListView
