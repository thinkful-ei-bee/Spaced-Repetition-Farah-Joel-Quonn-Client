import React, { Component } from 'react'
import languageService from '../../services/language-service'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {
  state = {
    language: [],
    words: []
  }
  
  getLanguage = () => {
    languageService.getLanguage()
      .then(language => {
        console.log(language)
        this.setState({
          language: language.language,
          words: language.words
        })
        console.log(this.state.words)
      })
  }

  componentDidMount() {
    this.getLanguage();
  }

  render() {    
    const words = this.state.words;
    const word = words.map(word => 
      word.translation
      )
    return (
      <section className="quiz-wrapper">
        <div className="quiz-status-bar">
          Status bar
        </div>
        <article className="learning-quiz-question-box">
          <h2> How do you say "{word[0]}"</h2>
        </article>
        <div className="answer-form">
          <form>
            <Label htmlFor='translation-input' className="translation-label">
              Enter translation<Required />
            </Label>
            <Input
              className="translation-input"
              ref={this.firstInput}
              id='translation-input'
              name='translation'
              required
              />
            <Button type='submit' className="btn">
              Submit answer
          </Button>
          </form>
        </div>
      </section>
    );
  }
}

export default LearningRoute
