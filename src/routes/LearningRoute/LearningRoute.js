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

    languageService.getLanguageHead()
      .then(totalScore =>  totalScore.totalScore)
      .then(this.context.setTotalScore)
    
    languageService.getLanguageHead()
      .then(wordCorrectCount =>  wordCorrectCount.wordCorrectCount)
      .then(this.context.setWordCorrectCount)

    languageService.getLanguageHead()
      .then(wordIncorrectCount =>  wordIncorrectCount.wordIncorrectCount)
      .then(this.context.setWordIncorrectCount)
  }

  displayWord() {
    const word = 
    <>
      <h2>Translate the word:</h2>
      <span>{this.context.nextWord}</span>
    </>
    return word;
  }

  displayTotalScore() {
      return <p>Your total score is: {this.context.totalScore}</p>
  }

  displayCorrectCount() {
    return <p>You have answered this word correctly {this.context.wordCorrectCount} times.</p>
  }

  displayIncorrectCount() {
    return <p>You have answered this word incorrectly {this.context.wordIncorrectCount} times.</p>
  }

  handleSubmitAnswer = (e) => {
    e.preventDefault();
    const { answer } = e.target
  }

  render() {
    return (
      <main>
        <section className="quiz-wrapper">
          <div className="quiz-status-bar">
            Status bar
          </div>
          <article className="learning-quiz-question-box">
            {this.displayWord()}
          </article>
          {this.displayTotalScore()}
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
            {this.displayCorrectCount()}
            {this.displayIncorrectCount()}
          </div>
        </section>
      </main>
    );
  }
}

export default LearningRoute
