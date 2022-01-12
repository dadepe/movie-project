import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { backgroundWeb } from "config"
import Home from "views/Home"
import MovieDetail from "views/MovieDetail"
import ScrollToTop from "templates/ScrollToTop"

const Container = styled.div`
  display: flex;
  background-color: #000;
  place-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${backgroundWeb};
  width: 100vw;
  max-width: 1400px;
  /*  */
  min-height: calc(100vh - 100px);
  padding-bottom: 100px;
`

function App() {
  return (
    <>
      <ScrollToTop />
      <Container>
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<MovieDetail />} />
          </Routes>
        </Content>
      </Container>
    </>
  )
}

export default App
