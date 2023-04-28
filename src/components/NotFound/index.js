import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'
import Header from '../Header'
import SideBar from '../SideBar'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const nfBgColor = isDarkTheme ? 'nf-bg-dark' : 'nf-bg-light'
      const nfHeading = isDarkTheme ? 'nf-heading-dark' : 'nf-light-heading'
      const nfAbout = isDarkTheme ? 'nf-dark-abt' : 'nf-light-abt'

      const nfImgUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div className={nfBgColor}>
          <Header />
          <SideBar />
          <>
            <img src={nfImgUrl} alt="not found" />
            <h1 className={nfHeading}>Page Not Found</h1>
            <p className={nfAbout}>
              We are sorry, the page you requested could not be found.
            </p>
          </>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
