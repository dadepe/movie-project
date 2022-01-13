import styled from "styled-components"
import LogoImage from "assets/img/rdp-logo.png"
import { mediumDevice, textGray, textWhite, yellow } from "config"
import DetailCard from "./DetailCard"
import { Link } from "react-router-dom"
import Episodes from "./Episodes"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`
const Container = styled(Column)`
  margin: 20px min(165px, 15%);
  @media (max-width: ${mediumDevice}px) {
    margin: 0;
  }
`

const IconImage = styled.img`
  width: 50px;
  height: 50px;
`

const Header = styled(Row)`
  margin-bottom: 80px;
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
  color: ${textWhite};
  @media (max-width: ${mediumDevice}px) {
    font-size: 20px;
  }
`

const Content = styled(Row)`
  @media (max-width: ${mediumDevice}px) {
    flex-direction: column;
  }
`

const InfoContainer = styled(Column)`
  margin-left: 30px;
  @media (max-width: ${mediumDevice}px) {
    margin: 0 15px;
    margin-top: 20px;
  }
`

const Description = styled(Row)`
  width: 100%;
  color: ${textWhite};
  @media (max-width: ${mediumDevice}px) {
    flex-direction: column;
  }
`

const OverviewContainer = styled(Column)`
  width: min(100%, 540px);
  margin-right: 30px;
  h2 {
    margin-bottom: 25px;
  }
  @media (max-width: ${mediumDevice}px) {
    margin-right: 0;
    h2 {
      margin-bottom: 15px;
    }
  }
`

const Overview = styled.span`
  font-size: 16px;
  color: ${textGray};
  background-color: #242424;
  line-height: 1.8;
  padding: 16px;
`

const CastContainer = styled(Column)`
  line-height: 2;
  @media (max-width: ${mediumDevice}px) {
    font-size: 14px;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 15px;
    span {
      margin-right: 10px;
    }
  }
`

const Separator = styled.span`
  display: none;
  @media (max-width: ${mediumDevice}px) {
    display: block;
    margin 0 -15px;
    margin-top: 20px;
    border-top: thin solid #4f4f4f;
  }
`

const Text = styled.span`
  font-weight: ${({ bold }) => (bold ? 500 : "normal")};
  ${({ color }) =>
    color &&
    `
    color : ${color};
  `}
`

export default function Detail({ state, castData }) {
  return (
    <Container>
      <Header>
        <Link to="/">
          <IconImage src={LogoImage} alt={"rdp-logo"} />
        </Link>
      </Header>
      <Content>
        <DetailCard cardData={state} width={35} height={55} />
        <InfoContainer>
          <Description>
            <OverviewContainer>
              <Title>Synopsis</Title>
              <Overview>{state?.overview}</Overview>
            </OverviewContainer>
            <CastContainer>
              <Text>Cast</Text>
              {castData.slice(0, 3).map((cast, i) => (
                <Text key={i} bold>
                  {cast.name}
                </Text>
              ))}

              <Text bold color={yellow}>
                more
              </Text>
            </CastContainer>
          </Description>
          <Separator />
          <Episodes state={state} />
        </InfoContainer>
      </Content>
    </Container>
  )
}
