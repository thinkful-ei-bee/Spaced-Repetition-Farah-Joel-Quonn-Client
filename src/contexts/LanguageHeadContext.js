import React, { Component } from 'react'

const LanguageHeadContext = React.createContext({
    nextWord: [],
    totalScore: 0,
    wordCorrectCount: 0, 
    wordIncorrectCount: 0,
    setNextWord: () => {},
    setTotalScore: () => {},
    setWordIncorrectCount: () => {},
    setWordCorrectCount: () => {}
  })

  export default LanguageHeadContext;

export class LanguageHeadProvider extends Component {
  state = {
    nextWord: [],
    totalScore: 0,
    wordCorrectCount: 0, 
    wordIncorrectCount: 0,
  }

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }
  setTotalScore = totalScore => {
    this.setState({ totalScore })
  }
  setWordIncorrectCount = wordIncorrectCount => {
    this.setState({ wordIncorrectCount })
  }
  setWordCorrectCount = wordCorrectCount => {
    this.setState({ wordCorrectCount })
  }

  render() {
    const value = {
      nextWord: this.state.nextWord,
      totalScore: this.state.totalScore,
      wordCorrectCount: this.state.wordCorrectCount, 
      wordIncorrectCount: this.state.wordIncorrectCount,
      setNextWord: this.setNextWord,
      setTotalScore: this.setTotalScore,
      setWordIncorrectCount: this.setWordIncorrectCount,
      setWordCorrectCount: this.setWordCorrectCount
    }

    return(
      <LanguageHeadContext.Provider value={value}>
        {this.props.children}
      </LanguageHeadContext.Provider>
    )
  }
}