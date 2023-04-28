import {Component} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/NxtWatchContext'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
    activeTab: 'Home',
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addToSavedList = video => {
    const {savedVideosList} = this.state
    const index = savedVideosList.findIndex(each => each.id === video.id)
    if (index === -1) {
      this.setState({savedVideosList: [...savedVideosList, video]})
    } else {
      savedVideosList.splice(index, 1)
      this.setState({savedVideosList})
    }
  }

  removeFromSavedList = id => {
    const {savedVideosList} = this.state
    const updatedSavedVideos = savedVideosList.filter(each => each.id !== id)
    this.setState({savedVideosList: updatedSavedVideos})
  }

  render() {
    const {isDarkTheme, activeTab, savedVideosList} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          activeTab,
          savedVideosList,
          addToSavedList: this.addToSavedList,
          changeTab: this.changeTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}
export default App
