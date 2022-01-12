import styled from "styled-components"
import { mediumDevice, textGray, textWhite } from "config"
import { FaPlay } from "react-icons/fa"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`

const Container = styled(Column)`
  color: ${textWhite};
  margin-top: 25px;
  @media (max-width: ${mediumDevice}px) {
    margin-top: 20px;
  }
`

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  @media (max-width: ${mediumDevice}px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`

const ListContainer = styled(Row)`
  flex: 1;
  border-bottom: thin solid #333333;
  padding-bottom: 20px;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
`

const ListHeader = styled(Row)`
  margin-bottom: 20px;
  flex-wrap: wrap;

  span {
    &:last-child {
      margin-left: auto;
    }
  }
  @media (max-width: ${mediumDevice}px) {
    flex-direction: column;
    span {
      &:last-child {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }
`

const ListTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  @media (max-width: ${mediumDevice}px) {
    font-size: 18px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  min-width: 30%;
  padding-top: 17%;
  height: fit-content;
  @media (max-width: ${mediumDevice}px) {
    min-width: 40%;
    padding-top: 25%;
  }
`

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

const Content = styled(Column)``

const ListInfoContainer = styled(Column)`
  flex: 1;
  margin-left: 15px;
  & > span {
    line-height: 2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const ListText = styled.span`
  color: ${textGray};
`

const PlayButton = styled(Row)`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8%;
  border-radius: 50%;
  background-color: #00000073;
`

const ListEpisode = ({ img, state }) => {
  return (
    <ListContainer>
      <ImageContainer>
        <PlayButton>
          <FaPlay size={16} color={"#fff"} />
        </PlayButton>
        <Image src={img} alt="movie-episode" />
      </ImageContainer>
      <ListInfoContainer>
        <ListHeader>
          <ListTitle>1 - {state.title}</ListTitle>
          <ListText>2h 30m</ListText>
        </ListHeader>
        <ListText>{state.overview}</ListText>
      </ListInfoContainer>
    </ListContainer>
  )
}

export default function Episodes({ state }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w200"
  const finalImage = baseImgUrl + state.backdrop_path
  return (
    <Container>
      <Title>Episodes</Title>
      <Content>
        <ListEpisode img={finalImage} state={state} />
      </Content>
    </Container>
  )
}
