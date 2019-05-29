import React, { Component } from 'react'
import languageService from '../../services/language-service'
import LanguageHeadContext from '../../contexts/LanguageHeadContext'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import "../../components/App/App.css"

class LearningRoute extends Component {

  static contextType = LanguageHeadContext;
 
  componentWillMount() {
    languageService.getLanguageHead()
      .then(nextWord =>  nextWord.nextWord)
      .then(this.context.setNextWord)
  }

  displayWord = () => {
    const word = 
    <>
      <h2>Translate the word:</h2>
      <span> "{this.context.nextWord}"</span>
    </>
    return word;
  }

  handleSubmitAnswer = (e) => {
    e.preventDefault();
    const { answer } = e.target
  }

  render() {
    return (
        <section className="quiz-wrapper">
          <div className="quiz-status-bar">
            Status bar
          </div>
          <article className="learning-quiz-question-box">
            {this.displayWord()}
          </article>
          <div className="answer-form">
            <form>
              <Label htmlFor='learn-guess-input' className="translation-label">
                What's the translation for this word?
              </Label>
              <Input
                className="translation-input"
                ref={this.firstInput}
                id='learn-guess-input'
                name='answer'
                required
                />
              <Button type='submit' className="btn">
                Submit your answer
            </Button>
            </form>
          </div>
        </section>
    );
  }
}

export default LearningRoute
