import React, { Component } from "react";
import { Link } from "react-router-dom";

// Styled Components / Utils
import { Card } from "../elements";

class AllQuestions extends Component {
  render() {
    const { questions } = this.props;

    return (
      <div className="AllQuestions">
        {questions.map((question) => {
          return (
            <Card className="card" key={question._id}>
              <h3 className="card__heading">
                <Link to={`/questions/${question._id}`}>{question.title}</Link>
              </h3>

              <div className="card__user">
                {question.user ? (
                  <Link
                    to={`/users/${question.user._id}/${question.user.name}`}
                  >
                    <button className="card__user-button">
                      {question.user.name}
                    </button>
                  </Link>
                ) : (
                  "User deleted profile :("
                )}
              </div>

              <div className="card__rating">
                <div className="card__rating-answers">
                  {question.answers.length} answers
                </div>
                <div className="card__rating-likes">
                  {question.likes.length} likes
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default AllQuestions;
