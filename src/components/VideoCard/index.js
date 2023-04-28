import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const VideoCard = props => {
  const {videos} = props
  const {
    publishedAt,
    viewCount,
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
  } = videos

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const videoCardBgColor = isDarkTheme
          ? 'video-card-bg-dark'
          : 'video-card-bg-light'

        let postedAt = formatDistanceToNow(new Date(publishedAt))
        const postedAtList = postedAt.split(' ')

        if (postedAtList.length === 3) {
          postedAtList.shift()
          postedAt = postedAtList.join(' ')
        }

        return (
          <Link to={`/videos/${id}`}>
            <li className={videoCardBgColor}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="video-card-img"
              />
              <div>
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile-img"
                />
                <div>
                  <h1 className="title">{title}</h1>
                  <p className="name">{name}</p>
                </div>
                <div>
                  <p className="view-count">{viewCount} views</p>
                  <p className="published-at">{postedAt}</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoCard
