import React, { Component } from 'react'
import "../../components/App/App.css"

class LearningRoute extends Component {
  render() {
    return (
      <section className="quiz-wrapper">
        <div className="quiz-status-bar">
          Status bar
        </div>
        <article className="learning-quiz-question-box">
          <h2> How do you say hello?</h2>
        </article>
        <div className="learning-answerBtn-box">
          <button className="answerBtn">
            A
        </button>
          <button className="answerBtn">
            B
        </button>
          <button className="answerBtn">
            C
        </button>
          <button className="answerBtn">
            D
        </button>
        </div>
      </section>
    );
  }
}

export default LearningRoute
