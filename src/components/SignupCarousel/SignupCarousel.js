/** @jsx jsx **/
import React, { useState, useRef, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import { Carousel } from './../Carousel/Carousel'
import { Arrow } from './../Carousel/Arrow'
import { Dots } from './../Carousel/Dots'
import HeaderImg from './Header.svg'
import { css, jsx } from '@emotion/core'

import img1 from './img1.svg'
import img2 from './img2.svg'
import img3 from './img3.svg'
import img4 from './img4.svg'

const SignupCarousel = props => {
  const [carousel, setCarousel] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.5
  })
  const [width, setWidth] = useState()
  const [show, setShow] = useState(true)
  const [redirect, setRedirect] = useState(false)

  const carouselWidth = useRef()
  useEffect(() => {
    setWidth(carouselWidth.current.getBoundingClientRect().width)
  }, [])

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions to advance/decrement the slides
  const { translate, transition, activeIndex } = carousel

  const nextSlide = () => {
    if (activeIndex === 3) {
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
        translate: 2 * width,
        activeIndex: 2
      })
    }

    setCarousel({
      ...carousel,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * width
    })
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const switchRedirect = () => {
    return setRedirect(true)
  }

  const renderRedirect = () => {
    if (redirect === true) {
      return <Redirect to='/avatar' />
    }
  }

  return (
    <Modal show={show} centered>
      <img css={headerCSS} src={HeaderImg} />
      <div css={carouselCSS} ref={carouselWidth}>
        <Carousel
          translate={translate}
          transition={transition}
          width={width * 4}
        >
          <div css={css`
              align-items: center;
              width: ${width}px;
              display: flex;
              flex-direction: column;
              `}
          >
            <img src={img1} css={css`margin-top: 52px`}/>
            <div style={{'position': 'absolute', 'top': '200px'}}>
              <p css={bigTextCSS}>Explore Work Spaces</p>
              <p css={smallTextCSS}>{'Find the perfect environment that \n allows you to focus!'}</p>
            </div>
          </div>

          <div css={css`
              align-items: center;
              width: ${width}px;
              display: flex;
              flex-direction: column;
              `}
          >
            <img src={img2} css={css`margin-top: 48px`}/>
            <div style={{'position': 'absolute', 'top': '200px'}}>
              <p css={bigTextCSS}>Leave Reviews</p>
              <p css={smallTextCSS}>{'Share your experiences with others and \n help them find their favorite work spot!'}</p>
            </div>
          </div>

          <div css={css`
              align-items: center;
              width: ${width}px;
              display: flex;
              flex-direction: column;
              `}
          >
            <img src={img3} css={css`margin-top: 65px`}/>
            <div style={{'position': 'absolute', 'top': '200px'}}>
              <p css={bigTextCSS}>Share Your Favorites</p>
              <p css={smallTextCSS}>{'Keep track of all your top spots you \n want to re-visit!'}</p>
            </div>
          </div>

          <div css={css`
              align-items: center;
              width: ${width}px;
              display: flex;
              flex-direction: column;
              `}
          >
            <img src={img4} css={css`margin-top: 33px`}/>
            <div style={{'position': 'absolute', 'top': '200px'}}>
              <p css={bigTextCSS}>Create Your Avatar</p>
              <p css={smallTextCSS}>{'Show a bit of personality with one \n of our avatar characters.'}</p>
            </div>
            <Button css={buttonCSS} onClick={() => setShow(false)}>Let's Go!</Button>
          </div>

        </Carousel>
        <Dots
          slides={[1,2,3,4]}
          activeIndex={activeIndex}
          margin={50}/>
      </div>
      <Arrow direction='left' handleClick={prevSlide} />
      <Arrow direction='right' handleClick={nextSlide} />
    </Modal>
  )
}

const headerCSS = css`
  margin-top: 36px;
`

const carouselCSS = css`
  display: flex;
  height: 425px;
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`

const bigTextCSS = css`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0;
  text-align: center;
`

const smallTextCSS = css`
  font-family: 'Roboto';
  font-size: 12px;
  text-align: center;
  white-space: pre-wrap;
`

const buttonCSS = css`
  background: #4775ff;
  border-radius: 22px;
  margin-top: 90px;
  width: 114px;
`

export default SignupCarousel
