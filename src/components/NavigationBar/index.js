import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {IoLogoGameControllerB} from 'react-icons/io'
import {RiMenuAddLine} from 'react-icons/ri'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

class NavigationBar extends Component {
  renderTabItems = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, changeTab, activeTab} = value
        const navListContainer = isDarkTheme ? 'nav-bg-dark' : 'nav-bg-light'
        const iconColor = isDarkTheme ? '#424242' : '#7e858e'
        const activeTabBg = isDarkTheme ? '#475569' : '#cbd5e1'
        const iconActive = '#ff0b37'

        const onClickHomeTab = () => {
          changeTab('Home')
        }

        const onClickTrendingTab = () => {
          changeTab('Trending')
        }

        const onClickGamingTab = () => {
          changeTab('Gaming')
        }

        const onClickSavedTab = () => {
          changeTab('Saved')
        }

        return (
          <ul className={navListContainer}>
            <Link to="/">
              <li
                key="home"
                className={activeTab === 'Home' ? activeTabBg : ''}
                onClick={onClickHomeTab}
              >
                <AiFillHome
                  size={20}
                  color={activeTab === 'Home' ? iconActive : iconColor}
                />
                <p className="icon-text">Home</p>
              </li>
            </Link>
            <Link to="/trending">
              <li
                key="trending"
                className={activeTab === 'Trending' ? activeTabBg : ''}
                onClick={onClickTrendingTab}
              >
                <AiFillFire
                  size={20}
                  color={activeTab === 'Trending' ? iconActive : iconColor}
                />
                <p className="icon-text">Trending</p>
              </li>
            </Link>
            <Link to="/gaming">
              <li
                key="gaming"
                className={activeTab === 'Gaming' ? activeTabBg : ''}
                onClick={onClickGamingTab}
              >
                <IoLogoGameControllerB
                  size={20}
                  color={activeTab === 'Gaming' ? iconActive : iconColor}
                />
                <p className="icon-text">Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos">
              <li
                key="saved"
                className={activeTab === 'Saved' ? activeTabBg : ''}
                onClick={onClickSavedTab}
              >
                <RiMenuAddLine
                  size={20}
                  color={activeTab === 'Saved' ? iconActive : iconColor}
                />
                <p className="icon-text">Saved Videos</p>
              </li>
            </Link>
          </ul>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return <>{this.renderTabItems()}</>
  }
}

export default NavigationBar
