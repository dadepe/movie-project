import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
`

export default function Stars({ rating, size = 16 }) {
  const generateStars = () => {
    let ratingTemp = Number(rating / 2) * 100
    let result = []

    for (let i = 0; i < 5; i += 1) {
      if (ratingTemp >= 100) {
        result.push(<IoIosStar key={i} size={size} />)
        ratingTemp -= 100
      } else if (ratingTemp >= 50) {
        result.push(<IoIosStarHalf key={i} size={size} />)
        ratingTemp -= 50
      } else {
        result.push(<IoIosStarOutline key={i} size={size} />)
      }
    }
    return result
  }

  return <Container>{generateStars()}</Container>
}
