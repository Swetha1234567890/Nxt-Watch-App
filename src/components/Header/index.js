import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {FaMoon} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
import {GiHamburgerMenu} from 'react-icons/gi'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'
import NavigationBar from '../NavigationBar'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickTheme = () => {
        toggleTheme()
      }

      const websiteLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const headerBgColor = isDarkTheme ? 'hbg-black' : 'hbg-white'

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className={headerBgColor}>
          <Link to="/">
            <img
              src={websiteLogo}
              className="website-logo"
              alt="website logo"
            />
          </Link>
          <div className="icons-dark-container">
            <button
              className="theme-btn"
              type="button"
              data-testid="theme"
              onClick={onClickTheme}
            >
              {isDarkTheme ? (
                <FiSun size={30} color="#ffffff" />
              ) : (
                <FaMoon size={30} />
              )}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              className="profile-img"
              alt="profile"
            />
            {isDarkTheme ? (
              <Popup
                modal
                trigger={
                  <button
                    className="dark-logout-btn"
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="pop-up">
                    <p className="dark-text">
                      Are you sure, you want to logout?
                    </p>
                    <div className="btn-container">
                      <button
                        className="dark-cancel-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="confirm-btn"
                        type="button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            ) : (
              <Popup
                modal
                trigger={
                  <button
                    className="light-logout-btn"
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                }
                className="popup-container"
              >
                {close => (
                  <div className="pop-up">
                    <p className="light-text">
                      Are you sure you want to logout?
                    </p>
                    <div className="btn-container">
                      <button
                        className="light-cancel-btn"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        className="confirm-btn"
                        type="button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            )}
          </div>
          <div className="mobile-icons-container">
            <button
              className="theme-btn"
              type="button"
              data-testid="theme"
              onClick={onClickTheme}
            >
              {isDarkTheme ? (
                <FiSun size={40} color="#ffffff" />
              ) : (
                <FaMoon size={40} />
              )}
            </button>
            <Popup
              modal
              trigger={
                <button className="hamburger-btn" type="button">
                  <GiHamburgerMenu size={30} />
                </button>
              }
            >
              {close => (
                <div>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={() => close()}
                  >
                    <IoMdClose size={20} />
                  </button>
                  <div className="list-items">
                    <NavigationBar />
                  </div>
                </div>
              )}
            </Popup>
            <button
              className="mobile-logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut size={30} />
            </button>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(Header)
