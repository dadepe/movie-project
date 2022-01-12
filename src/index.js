import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// PACKAGE
import { HashRouter } from "react-router-dom"

// STYLES
import "styles/index.scss"
import "styles/button.scss"
import "styles/spinner.scss"
import "styles/transition.scss"
import "styles/carousel.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
