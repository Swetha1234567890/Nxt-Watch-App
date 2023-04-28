import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'
import VideoCard from '../VideoCard'
import NxtWatchContext from '../../context/NxtWatchContext'
import SideBar from '../SideBar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isPopup: true,
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  onClickClose = () => {
    this.setState({isPopup: false})
  }

  adPopup = () => (
    <div className="right-top-container" data-testid="banner">
      <div className="text-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="watch-logo"
          alt="next watch logo"
        />
        <p className="about-plan">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button className="get-btn" type="button">
          GET IT NOW
        </button>
      </div>
      <div className="banner-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
          className="banner-img"
          alt="Banner Background"
        />
      </div>
      <div className="btn-container">
        <button
          className="close-btn"
          type="button"
          onClick={this.onClickClose}
          data-testid="close"
        >
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  )

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderVideosListView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videosClassName = isDarkTheme
          ? 'dark-container'
          : 'light-container'
        const npClassName = isDarkTheme
          ? 'np-dark-container'
          : 'np-light-container'

        const {videosList, searchInput} = this.state
        const searchResults = videosList.filter(each =>
          each.title.toLowerCase().includes(searchInput.toLowerCase()),
        )
        const showVideoList = searchResults.length > 0

        return showVideoList ? (
          <ul className={videosClassName}>
            {searchResults.map(each => (
              <VideoCard key={each.id} videos={each} />
            ))}
          </ul>
        ) : (
          <div className={npClassName}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className="np-img"
              alt="no videos"
            />
            <h1 className="np-heading">No Search results found</h1>
            <p className="np-about">
              Try different key words or remove search filter
            </p>
            <button
              className="retry-btn"
              type="button"
              onClick={this.getVideos}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="loader-container" data-testid="loader">
            <Loader
              type="ThreeDots"
              color={isDarkTheme ? '#ffffff' : '#000000'}
              height="50"
              width="50"
            />
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  getSearchResults = () => {
    this.getVideos()
  }

  renderVideosStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isPopup, searchInput} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeContainerClassName = isDarkTheme
            ? 'dark-home-container'
            : 'home-container'
          const inputClassName = isDarkTheme ? 'input-dark-container' : ''

          return (
            <div className={homeContainerClassName} data-testid="home">
              <Header />
              <SideBar />
              <div className="home-right-top-container">
                {isPopup && this.adPopup()}
              </div>
              <div className="input-container">
                <input
                  type="search"
                  className={`user-input ${inputClassName}`}
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-icon"
                  data-testid="searchButton"
                  onClick={this.getSearchResults}
                >
                  <BsSearch size={20} />
                </button>
              </div>
              {this.renderVideosStatusView()}
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
