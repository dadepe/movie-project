import Stars from "components/Stars"
import styled from "styled-components"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import {
  yellow,
  genreList,
  mediumDevice,
  textWhite,
  blue,
  transBlue,
} from "config"
import { Link } from "react-router-dom"
import { smallDevice } from "config"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`

const Container = styled.div`
  overflow: hidden;
  position: relative;
  cursor: pointer;
  @media (max-width: ${mediumDevice}px) {
    min-width: 50% !important;
    padding-top: 75% !important;
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
  transition: all 1s;
  ${Container}:hover & {
    transform: scale(1.1);
  }
`

const InfoContainer = styled(Column)`
  color: ${textWhite};
  z-index: 2;
  position: absolute;
  inset: 0;
  padding: 24px;
  justify-content: flex-end;
  background-image: linear-gradient(180deg, transparent, #000000ad);
  @media (max-width: ${mediumDevice}px) {
    padding: 10px;
  }
`

const InfoWrapper = styled(Column)`
  position: relative;
  bottom: -20px;
  transition: all 0.5s;
  ${Container}:hover & {
    transform: translateY(-40px);
  }
`

const Title = styled.span`
  font-size: 24px;
  font-weight: 500;
  margin-top: 18px;
  @media (max-width: ${mediumDevice}px) {
    margin-top: 6px;
    font-size: 16px;
  }
`

const Tag = styled.span`
  font-size: 14px;
  width: fit-content;
  color: ${blue};
  background-color: ${transBlue};
  padding: 4px 8px;
  border-radius: 0 8px 0 8px;

  @media (max-width: ${mediumDevice}px) {
    font-size: 10px;
    padding: 2px 4px;
  }
`

const StarsContainer = styled(Row)`
  margin-top: 20px;
  @media (max-width: ${mediumDevice}px) {
    margin-top: 6px;
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  color: ${yellow};
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  /* transition */
  visibility: hidden;
  opacity: 0;
  transition: all 1s;
  /*  */
  svg {
    margin-left: 10px;
    margin-top: 5px;
  }
  @media (max-width: ${mediumDevice}px) {
    margin-right: 0;
  }

  @media (max-width: ${smallDevice}px) {
    font-size: 16px;
  }

  ${Container}:hover & {
    visibility: visible;
    opacity: 1;
  }
`

export default function Card({ cardData, width = 100, height = 100, style }) {
  const baseImgUrl = "https://image.tmdb.org/t/p/w300"
  const finalImage = baseImgUrl + cardData.poster_path
  const genre = genreList.find((x) => x.id === cardData.genre_ids[0])

  return (
    <Container
      style={{
        minWidth: `min(${width}%, 292px)`,
        paddingTop: `min(${height}%, 440px)`,
        ...style,
      }}
    >
      <Link to={`/${cardData.id}`} state={{ ...cardData }}>
        <InfoContainer>
          <InfoWrapper>
            <Tag>{genre?.name}</Tag>
            <StarsContainer>
              <Stars rating={cardData.vote_average} />
            </StarsContainer>
            <Title>{cardData.title}</Title>
          </InfoWrapper>

          <Button className="button">
            Watch now <MdOutlineArrowForwardIos size={16} color={yellow} />
          </Button>
        </InfoContainer>
        <Image src={finalImage} alt={cardData.title} />
      </Link>
    </Container>
  )
}
