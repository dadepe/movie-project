import { useEffect, useState, useRef } from "react"
import { useParams, useLocation } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { apiKey } from "config"
import CardContainer from "templates/CardContainer"
import Detail from "components/MovieDetail/Detail"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function MovieDetail(props) {
  const previousState = useRef(null)
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  const [mount, setMount] = useState(true)
  const [similiarData, setSimiliarData] = useState([])
  const [castData, setCastData] = useState([])

  const fetchCast = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    )
    // console.log("CAST DATA", { data })
    setCastData(data.cast)
  }

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
    )
    // console.log("SIMILIAR DATA", data)
    setSimiliarData(data.results)
  }

  useEffect(() => {
    fetchData()
    fetchCast()
  }, [id])

  useEffect(() => {
    return () => {
      previousState.current = state
      setMount(false)
    }
  }, [state])

  return (
    <Container>
      <Detail
        state={mount && state ? state : previousState.current}
        castData={castData}
      />
      <CardContainer title={"You Might Also Like This!"} data={similiarData} />
    </Container>
  )
}
