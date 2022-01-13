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
  border-bottom: thin solid #4f4f4f;
  padding-bottom: 24px;
  margin-bottom: 24px;
  &:last-child {
    padding-bottom: 15px;
    margin-bottom: 15px;
    margin-bottom: 0;
  }
`

const ListHeader = styled(Row)`
  margin-bottom: 15px;
  flex-wrap: wrap;

  span {
    &:last-child {
      margin-left: auto;
    }
  }
  @media (max-width: ${mediumDevice}px) {
    flex-direction: column;
    margin-bottom: 5px;
    span {
      &:last-child {
        margin-left: 0;
        margin-top: 5px;
        font-size: 10px;
      }
    }
  }
`

const ListTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  @media (max-width: ${mediumDevice}px) {
    font-size: 14px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  min-width: min(30%, 160px);
  padding-top: min(17%, 100px);
  height: fit-content;
  @media (max-width: ${mediumDevice}px) {
    min-width: min(40%, 109px);
    padding-top: min(25%, 70px);
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
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const ListText = styled.span`
  color: ${textGray};
  @media (max-width: ${mediumDevice}px) {
    font-size: 10px;
  }
`

const PlayButton = styled(Row)`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px;
  border-radius: 50%;
  background-color: #1d1d1d83;
  @media (max-width: ${mediumDevice}px) {
    padding: 10px;
  }
`

const ListEpisode = ({ img, state }) => {
  return (
    <ListContainer>
      <ImageContainer>
        <PlayButton>
          <FaPlay size={12} color={"#fff"} />
        </PlayButton>
        <Image src={img} alt="movie-episode" />
      </ImageContainer>
      <ListInfoContainer>
        <ListHeader>
          <ListTitle>1 - {state?.title}</ListTitle>
          <ListText>2h 30m</ListText>
        </ListHeader>
        <ListText>{state?.overview}</ListText>
      </ListInfoContainer>
    </ListContainer>
  )
}

export default function Episodes({ state }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w200"
  const finalImage = baseImgUrl + state?.backdrop_path
  return (
    <Container>
      <Title>Episodes</Title>
      <Content>
        <ListEpisode img={finalImage} state={state} />
      </Content>
    </Container>
  )
}
