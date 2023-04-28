import {Component} from 'react'
import NxtWatchContext from '../../context/NxtWatchContext'
import NavigationBar from '../NavigationBar'

class SideBar extends Component {
  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const className = isDarkTheme
            ? 'dark-sidebar-container'
            : 'side-bar-container'

          return (
            <div className={className}>
              <NavigationBar />
              <div className="bottom-container">
                <h1 className="heading">CONTACT US</h1>
                <div className="icons-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    className="sm-icons"
                    alt="facebook logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    className="sm-icons"
                    alt="twitter logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    className="sm-icons"
                    alt="linked in logo"
                  />
                </div>
                <p className="about">
                  Enjoy! Now to see <br />
                  your channels and <br />
                  recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SideBar
