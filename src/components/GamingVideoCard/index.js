import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, title, viewCount} = videoDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const gameContainer = isDarkTheme ? 'game-bg-dark' : 'game-bg-light'

        return (
          <Link to={`/videos/${id}`}>
            <li className={gameContainer}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-img"
              />
              <h1 className="title">{title}</h1>
              <p className="view-count">{viewCount} Watching Worldwide</p>
            </li>
          </Link>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default GamingVideoCard
