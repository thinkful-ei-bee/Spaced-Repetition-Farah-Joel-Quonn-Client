import React, { Component } from 'react'

const LanguageHeadContext = React.createContext({
    nextWord: [],
    setNextWord: () => {}
  })

  export default LanguageHeadContext;

export class LanguageHeadProvider extends Component {
  state = {
    nextWord: [],
  }

  setNextWord = nextWord => {
    this.setState({ nextWord })
  }

  render() {
    const value = {
      nextWord: this.state.nextWord,
      setNextWord: this.setNextWord
    }

    return(
      <LanguageHeadContext.Provider value={value}>
        {this.props.children}
      </LanguageHeadContext.Provider>
    )
  }

}