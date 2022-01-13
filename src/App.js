import { Routes, Route } from "react-router-dom"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
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
  /*  */
  width: 100vw;
  max-width: 1440px;
  min-height: calc(100vh - 100px);
  padding-bottom: 100px;
`

function App() {
  const location = useLocation()

  const pageMotion = {
    initial: {
      x: 0,
      opacity: 0,
    },
    animate: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      zIndex: 0,
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }
  return (
    <>
      <ScrollToTop />
      <Container>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageMotion}
                >
                  <Content>
                    <Home />
                  </Content>
                </motion.div>
              }
            />
            <Route
              path="/:id"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageMotion}
                >
                  <Content>
                    <MovieDetail />
                  </Content>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </Container>
    </>
  )
}

export default App
