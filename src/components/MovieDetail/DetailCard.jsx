import Stars from "components/Stars"
import { useNavigate } from "react-router-dom"
import { textWhite, textGray, mediumDevice, turquoise, genreList } from "config"
import { MdOutlineArrowBackIos } from "react-icons/md"
import styled from "styled-components"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`

const Container = styled.div`
  position: relative;
  height: fit-content;
  @media (max-width: ${mediumDevice}px) {
    min-width: 100% !important;
    padding-top: 90% !important;
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

const InfoContainer = styled(Column)`
  color: ${textWhite};
  z-index: 2;
  position: absolute;
  inset: 0;
  padding: 30px;
  justify-content: flex-end;
  background-image: linear-gradient(180deg, transparent, #000000ad);
  @media (max-width: ${mediumDevice}px) {
    padding: 20px;
  }

  div,
  span {
    margin-top: 7px;
    @media (max-width: ${mediumDevice}px) {
      margin-top: 3px;
    }
  }
`

const Title = styled.span`
  font-size: 28px;
  font-weight: 500;
  @media (max-width: ${mediumDevice}px) {
    font-size: 24px;
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
  align-items: center;
  flex-wrap: wrap;
  span {
    margin-left: 7px;
    &:last-child {
      color: ${textGray};
    }
  }
`

const Text = styled.span``

const Arrow = styled.button`
  display: none;
  z-index: 10;
  position: absolute;
  top: 25%;
  transform: translateY(-50%);
  padding: 15px;
  border-radius: 50%;
  &:hover {
    background-color: #857f7f61;
  }
  @media (max-width: ${mediumDevice}px) {
    display: flex;
  }
`

const ArrowLeft = styled(Arrow)`
  left: 10px;
`

export default function DetailCard({
  cardData,
  width = 100,
  height = 100,
  style,
}) {
  const navigate = useNavigate()
  const baseImgUrl = "https://image.tmdb.org/t/p/w300"
  const finalImage = baseImgUrl + cardData.poster_path
  const genre = genreList.find((x) => x.id === cardData.genre_ids[0])

  return (
    <Container
      style={{ minWidth: `${width}%`, paddingTop: `${height}%`, ...style }}
    >
      <ArrowLeft className="button" onClick={() => navigate(-1)}>
        <MdOutlineArrowBackIos size={16} color={"#fff"} />
      </ArrowLeft>
      <InfoContainer>
        <Tag>{genre?.name}</Tag>
        <StarsContainer>
          <Stars rating={cardData.vote_average} />
          <Text>•</Text>
          <Text>Release Year : {cardData.release_date.substring(0, 4)}</Text>
        </StarsContainer>
        <Title>{cardData.title} </Title>
      </InfoContainer>
      <Image src={finalImage} alt={cardData.title} />
    </Container>
  )
}
