import { useState, useRef, forwardRef } from "react"
import styled from "styled-components"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Carousel } from "react-responsive-carousel"
import LogoImage from "assets/img/rdp-logo.png"
import { turquoise, mediumDevice } from "config"
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"
import Stars from "components/Stars"
import { Link } from "react-router-dom"
import { textWhite, genreList } from "config"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`

const Container = styled(Row)`
  position: relative;
  height: 80vh;
  max-height: 600px;
  @media (max-width: ${mediumDevice}px) {
    height: 45vh;
  }
`

const PosterContainer = styled(Row)`
  position: absolute;
  inset: 0;
  @media (max-width: ${mediumDevice}px) {
    position: static;
    height: 100%;
  }
`

const PosterWrapper = styled(Row)`
  position: relative;
  width: 100%;
  height: 100%;
`

const PosterImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
`

const IconImage = styled.img`
  width: 50px;
  height: 50px;
`

const Content = styled(Column)`
  box-sizing: border-box;
  z-index: 2;
  padding: 20px 10%;
  width: 100%;
  background-image: linear-gradient(270deg, transparent, #000000ad);
  @media (max-width: ${mediumDevice}px) {
    padding: 10px 10px 10px 20px;
  }
  a {
    width: fit-content;
  }
`

const InfoContainer = styled(Column)`
  color: ${textWhite};
  height: 100%;
  justify-content: center;
  a {
    width: fit-content;
  }
`

const TextContainer = styled(Column)`
  width: 60%;
  min-width: 350px;
  h1,
  span {
    margin-top: 15px;
  }
  @media (max-width: ${mediumDevice}px) {
    text-align: left;
    width: 100%;
    min-width: 0;
  }
`

const Title = styled.h2`
  font-size: 50px;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
  @media (max-width: ${mediumDevice}px) {
    font-size: 28px;
    margin-top: 7px;
  }
`

const Tag = styled.span`
  font-size: 14px;
  width: fit-content;
  color: ${turquoise};
  background-color: #19d8e43b;
  padding: 3px 10px;
  border-radius: 0 10px 0 10px;
`

const StarsContainer = styled(Row)`
  margin-top: 15px;
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const Overview = styled.span`
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const Button = styled.button`
  margin-top: 20px;
  @media (max-width: ${mediumDevice}px) {
    padding: 10px;
    width: 150px;
  }

  &:hover {
    background-color: #c1ae0821;
    box-shadow: 3px 25px 29px -7px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 3px 25px 29px -7px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 3px 25px 29px -7px rgba(0, 0, 0, 0.2);
  }
`

const Arrow = styled.button`
  display: flex;
  z-index: 10;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 15px;
  border-radius: 50%;
  &:hover {
    background-color: #857f7f61;
  }
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const ArrowLeft = styled(Arrow)`
  left: 10px;
`

const ArrowRight = styled(Arrow)`
  right: 10px;
`

const WebPoster = styled(Row)`
  flex: 1;
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const MobilePoster = styled(Row)`
  display: none;
  width: 100%;
  @media (max-width: ${mediumDevice}px) {
    display: flex;
  }
`

const PosterCard = forwardRef(({ posterData }, ref) => {
  const baseImgUrl = "https://image.tmdb.org/t/p/original"
  const finalImage = baseImgUrl + posterData.backdrop_path
  const genre = genreList.find((x) => x.id === posterData.genre_ids[0])
  return (
    <PosterContainer ref={ref}>
      <PosterWrapper>
        <Content>
          <Link to="/">
            <IconImage src={LogoImage} alt={"rdp-logo"} />
          </Link>
          <InfoContainer>
            <Tag>{genre?.name}</Tag>
            <StarsContainer>
              <Stars rating={posterData.vote_average} />
            </StarsContainer>
            <TextContainer>
              <Title>{posterData.title}</Title>
              <Overview>{posterData.overview}</Overview>
            </TextContainer>
            <Link to={`/${posterData.id}`} state={{ ...posterData }}>
              <Button className="button-default">Watch now</Button>
            </Link>
          </InfoContainer>
        </Content>
        <PosterImage src={finalImage} alt={posterData.title} />
      </PosterWrapper>
    </PosterContainer>
  )
})

export default function Poster({ data = [] }) {
  // console.log("\n\n\n POSTER DATA")
  // console.log({ data })
  const transitionRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleToLeft = () => {
    let limit = data.length - 1
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
    else setCurrentIndex(limit)
  }

  const handleToRight = () => {
    let limit = data.length - 1
    if (currentIndex < limit) setCurrentIndex(currentIndex + 1)
    else setCurrentIndex(0)
  }

  return (
    <Container>
      <ArrowLeft className="button" onClick={handleToLeft}>
        <MdOutlineArrowBackIos size={16} color={"#fff"} />
      </ArrowLeft>
      <ArrowRight className="button" onClick={handleToRight}>
        <MdOutlineArrowForwardIos size={16} color={"#fff"} />
      </ArrowRight>
      <WebPoster>
        {data.length && (
          <TransitionGroup className="poster-transition-container">
            <CSSTransition
              nodeRef={transitionRef}
              key={data[currentIndex].id}
              timeout={500}
              classNames={"fade"}
            >
              <PosterCard ref={transitionRef} posterData={data[currentIndex]} />
            </CSSTransition>
          </TransitionGroup>
        )}
      </WebPoster>
      <MobilePoster>
        {data.length && (
          <Carousel showStatus={false}>
            {data.map((posterData, i) => (
              <PosterCard key={i} posterData={posterData} />
            ))}
          </Carousel>
        )}
      </MobilePoster>
    </Container>
  )
}
