import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiMenuAddLine} from 'react-icons/ri'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'
import SideBar from '../SideBar'
import Header from '../Header'
import FailureView from '../FailureView'

const apiVideoStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiVideoStatusConstants.initial,
    videoDetailsList: [],
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoItem()
  }

  getVideoItem = async () => {
    this.setState({apiStatus: apiVideoStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.map(each => ({
        id: each.video_details.id,
        title: each.video_details.title,
        videoUrl: each.video_details.video_url,
        thumbnailUrl: each.video_details.thumbnail_url,
        viewCount: each.video_details.view_count,
        publishedAt: each.video_details.publishedAt,
        description: each.video_details.description,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
          subscriberCount: each.channel.subscriber_count,
        },
      }))
      this.setState({
        videoDetailsList: updatedData,
        apiStatus: apiVideoStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiVideoStatusConstants.failure})
    }
  }

  clickLiked = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  clickDisliked = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderSuccessView = () => {
    const {videoDetailsList, isLiked, isDisliked} = this.state

    return (
      <ul className="list-container">
        {videoDetailsList.map(each => (
          <VideoItemDetails
            key={each.id}
            videoDetails={each}
            clickDisliked={this.clickDisliked}
            clickLiked={this.clickLiked}
            clickSaved={this.clickSaved}
            isLiked={isLiked}
            isDisliked={isDisliked}
          />
        ))}
      </ul>
    )
  }

  onRetry = () => {
    this.getVideoItem()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

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

  renderVideosPlayerStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiVideoStatusConstants.success:
        return this.renderSuccessView()
      case apiVideoStatusConstants.failure:
        return this.renderFailureView()
      case apiVideoStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const videoItemBgColor = isDarkTheme
            ? 'video-item-bg-dark'
            : 'video-item-bg-light'

          return (
            <div className={videoItemBgColor}>
              <Header />
              <SideBar />
              <div className="container" data-testid="videoItemDetails">
                {this.renderVideosPlayerStatusView()}
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
