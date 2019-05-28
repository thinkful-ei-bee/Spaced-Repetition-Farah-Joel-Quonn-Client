import React, { Component } from 'react'

const LanguageContext = React.createContext({
  language: "",
  words: [],
  setLanguage: () => {},
  setWords: () => {}
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: "",
    words: []
  };

  setLanguage = language => {
    console.log('Setting Language Context language')
    console.log(language)
    this.setState({ language })
  }

  setWords = words => {
    console.log('Set Words Language Context', words)
    this.setState({ words })
  }

  render() {
    const value = {
      language: this.state.language,
      setLanguage: this.setLanguage,
      words: this.state.words,
      setWords: this.setWords
    }
    
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}