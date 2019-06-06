import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageContext from '../../contexts/LanguageContext'

class DashboardRoute extends Component {

  state = {
    words: [{}]
  }

  static contextType = LanguageContext;

  componentWillMount() {
    languageService.getLanguage()
      .then(language => language.language.name)
      .then(this.context.setLanguage)

    languageService.getLanguage()
      .then(language => (language.words))
      .then(this.context.setWords)
  }

  renderWords() {
    let { words = [] } = this.context

    return words.map(word => {
      console.log(word)
      return <>
        <p>{word.original}</p>
      </>
    }
    )

  }

  render() {
    const subtitle = this.context.language
    let words = this.renderWords()
    return (
      <section>
        <h3>{subtitle}</h3>
        <h4 lang="fr">Words to practice:</h4>
        {words}
      </section>
    );
  }
}

export default DashboardRoute
