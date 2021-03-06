import { useEffect, useState } from "react"
import Card from "components/Home/Card"
import { yellow } from "config"
import { mediumDevice, textWhite } from "config"
import styled from "styled-components"
import { MdOutlineArrowForwardIos } from "react-icons/md"
import ScrollContainer from "react-indiana-drag-scroll"

const Row = styled.div`
  display: flex;
`

const Column = styled(Row)`
  flex-direction: column;
`

const Container = styled(Column)`
  flex: 1;
  margin-top: 50px;

  @media (max-width: ${mediumDevice}px) {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 20px;
  }
`

const Content = styled(Row)`
  width: 100%;
  max-width: 100%;
  margin-top: 20px;
`

const Header = styled(Row)`
  margin-left: min(165px, 15%);
  margin-right: min(165px, 15%);
  @media (max-width: ${mediumDevice}px) {
    margin-left: 0;
    margin-right: 0;
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

const Button = styled.button`
  display: flex;
  align-items: center;
  color: ${yellow};
  margin-left: auto;

  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  svg {
    margin-left: 10px;
  }
  @media (max-width: ${mediumDevice}px) {
    margin-right: 0;
    font-size: 14px;
  }
`

const EmptyLeft = styled(Row)`
  margin-left: min(165px, 15%);
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

const EmptyRight = styled(Row)`
  margin-right: min(165px, 15%);
  @media (max-width: ${mediumDevice}px) {
    display: none;
  }
`

export default function CardContainer({ title = "Title", data = [] }) {
  // console.log(`\n\n\n ${title} DATA`)
  // console.log({ data })
  const [shuffledData, setShuffledData] = useState([])

  const shuffled = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
      .slice(0, 8)
  }

  useEffect(() => {
    if (data.length) {
      setShuffledData(shuffled(data))
    }
  }, [data])

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Button className="button">
          See All <MdOutlineArrowForwardIos size={16} color={yellow} />
        </Button>
      </Header>
      <Content>
        <ScrollContainer style={{ flex: 1, display: "flex" }}>
          <EmptyLeft />
          {shuffledData.map((cardData, i) => (
            <Card
              key={i}
              width={21}
              cardData={cardData}
              height={35}
              style={{
                marginRight:
                  i !== shuffledData.length - 1 ? "min(30px, 3%)" : 0,
              }}
            />
          ))}

          <EmptyRight />
        </ScrollContainer>
      </Content>
    </Container>
  )
}
