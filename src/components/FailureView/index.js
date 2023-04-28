import NxtWatchContext from '../../context/NxtWatchContext'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const flHeading = isDarkTheme ? 'heading-dark' : 'heading-light'
        const failureImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="failure-container">
            <img src={failureImage} className="f-img" alt="failure view" />
            <h1 className={flHeading}>Oops! Something Went Wrong</h1>
            <p className="fl-about">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button className="retry-btn" type="button" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default FailureView
