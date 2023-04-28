import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const TrendingVideoCard = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, viewCount, publishedAt, title, name} = videoDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const trendingBg = isDarkTheme
          ? 'trending-bg-dark'
          : 'trending-bg-light'
        let postedAt = formatDistanceToNow(new Date(publishedAt))
        const postedAtList = postedAt.split(' ')

        if (postedAtList.length === 3) {
          postedAtList.shift()
          postedAt = postedAtList.join(' ')
        }

        return (
          <Link to={`/videos/${id}`}>
            <li className={trendingBg}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="trending-img"
              />
              <div>
                <h1 className="title">{title}</h1>
                <p className="name">{name}</p>
              </div>
              <div>
                <p className="view-count">{viewCount}</p>
                <p className="published-at">{postedAt}</p>
              </div>
            </li>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default TrendingVideoCard
