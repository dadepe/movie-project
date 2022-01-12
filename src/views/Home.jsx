import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { throttle } from "throttle-debounce"
import { apiKey } from "config"
import Poster from "components/Home/Poster"
import CardContainer from "templates/CardContainer"
import Spinner from "components/Spinner"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const LoadingContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #777777;
  span {
    margin-top: 20px;
  }
`

const Text = styled.span`
  font-size: 20px;
`

export default function Home(props) {
  const [movieData, setMovieData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNextRendered, setIsNextRendered] = useState(false)

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    )
    // console.log(data)
    setMovieData(data.results)
  }

  const handleOnBottomReach = () => {
    if (!isNextRendered) {
      // console.log("HANDLE BOTTOM HIT")
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsNextRendered(true)
      }, 1500)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = throttle(300, () => {
      let calc = Math.floor(window.innerHeight + window.pageYOffset)
      let offsetHeight = Math.floor(document.body.offsetHeight)

      if (calc + offsetHeight * 0.1 >= offsetHeight && !isLoading) {
        handleOnBottomReach()
      }
    })
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  })

  return (
    <Container>
      <Poster data={movieData.slice(0, 3)} />
      <CardContainer data={movieData} title={"New Release"} />
      <CardContainer data={movieData} title={"TV Show"} />
      {/* Loading in here */}
      {isLoading && (
        <LoadingContainer>
          <Spinner size={50} />
          <Text>loading more movies from you...</Text>
        </LoadingContainer>
      )}
      {isNextRendered && !isLoading && (
        <CardContainer data={movieData} title={"Popular"} />
      )}
    </Container>
  )
}
