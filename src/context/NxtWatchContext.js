import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  changeTab: () => {},
  savedVideosList: [],
  addToSavedList: () => {},
  activeTab: 'HOME',
})

export default NxtWatchContext
