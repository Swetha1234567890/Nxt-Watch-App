import {CgPlayListAdd} from 'react-icons/cg'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import SideBar from '../SideBar'
import TrendingVideoCard from '../TrendingVideoCard'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value
      const savedText = isDarkTheme ? 'save-dark-text' : 'dave-light-text'
      const savedHeading = isDarkTheme
        ? 'saved-dark-heading'
        : 'saved-light-heading'
      const svText = isDarkTheme ? 'sv-dark-text' : 'sv-light-text'

      return (
        <div className="saved-videos-container">
          <Header />
          <SideBar />
          <div data-testid="savedVideos">
            <CgPlayListAdd size={35} color="#ff0000" />
            <p className={savedText}>Saved Videos</p>
          </div>
          {savedVideosList.length > 0 ? (
            <div>
              {savedVideosList.map(each => (
                <TrendingVideoCard key={each.id} videoDetails={each} />
              ))}
            </div>
          ) : (
            <div className="no-saved-videos">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                className="no-saved-img"
                alt="no saved videos"
              />
              <h1 className={savedHeading}>No saved videos found</h1>
              <p className={svText}>
                You can save your videos while watching them
              </p>
            </div>
          )}
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
