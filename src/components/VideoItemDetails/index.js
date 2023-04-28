import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiMenuAddLine} from 'react-icons/ri'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const VideoItemDetails = props => {
  const {videoDetails, isLiked, isDisliked, clickLiked, clickDisliked} = props

  const onClickLike = () => {
    clickLiked()
  }

  const onClickDislike = () => {
    clickDisliked()
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, addToSavedList, savedVideosList} = value
        const videoPlayerBgColor = isDarkTheme
          ? 'player-bg-dark'
          : 'player-bg-light'
        const likeIsActive = isLiked ? 'active' : 'not-active'
        const dislikeActive = isDisliked ? 'active' : 'not-active'
        let isSaved
        const index = savedVideosList.findIndex(
          each => each.id === videoDetails.id,
        )
        if (index === -1) {
          isSaved = false
        } else {
          isSaved = true
        }

        const saveIsActive = isSaved ? 'active' : 'not-active'
        const saveText = isSaved ? 'Saved' : 'Save'

        const onClickSave = () => {
          addToSavedList(videoDetails)
        }

        return (
          <div className={videoPlayerBgColor}>
            <div className="video-player-container">
              <ReactPlayer
                url={videoDetails.videoUrl}
                controls
                width="100%"
                height="100%"
              />
            </div>
            <div className="video-text-container">
              <p className="title">{videoDetails.title}</p>
              <div className="mini-text-container">
                <div className="mini-left-container">
                  <p className="view-count">{videoDetails.viewCount}</p>
                  <p className="published-at">{videoDetails.publishedAt}</p>
                </div>
                <div className="icons-container">
                  <button
                    className={likeIsActive}
                    type="button"
                    onClick={onClickLike}
                  >
                    <BiLike size={20} />
                    Like
                  </button>
                  <button
                    className={dislikeActive}
                    type="button"
                    onClick={onClickDislike}
                  >
                    <BiDislike size={20} />
                    Dislike
                  </button>

                  <button
                    className={saveIsActive}
                    type="button"
                    onClick={onClickSave}
                  >
                    <RiMenuAddLine size={20} />
                    {saveText}
                  </button>
                  <hr />
                  <div className="video-details-container">
                    <div>
                      <img
                        src={videoDetails.profileImageUrl}
                        alt="website logo"
                      />
                      <div>
                        <p className="name">{videoDetails.name}</p>
                        <p className="count">{videoDetails.subscriberCount}</p>
                      </div>
                    </div>
                    <p className="description">{videoDetails.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoItemDetails
