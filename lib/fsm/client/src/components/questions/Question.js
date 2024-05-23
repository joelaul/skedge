import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

// COMPONENTS
import Answer from "./Answer";
import AnswerFeed from "./AnswerFeed";
import Ads from "../layout/Ads";

// ACTIONS
import {
  getQuestion,
  deleteQuestion,
  likeQuestion,
  clearErrors,
} from "../../actions/questionActions";

// STYLED-COMPONENTS
import { Card, Button } from "../elements";
import { lighterblack, white, elevation } from "../../utils";

class Question extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getQuestion(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({ errors: nextProps.errorReducer });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  deleteQuestion(questionId) {
    this.props.deleteQuestion(questionId, this.props.history);
  }

  onLikeClick(questionId) {
    this.props.likeQuestion(questionId);
  }

  render() {
    const { question } = this.props.questionReducer;

    const { title, body, user, likes } = this.props.questionReducer.question;
    const { id } = this.props.authReducer.user;
    const questionId = this.props.questionReducer.question._id;

    if (likes === undefined) return "...loading";

    return (
      <div className="Question">

        <Card className="card" key={question._id}>

          <h3 className="card__heading">{question.title}</h3>
          
          <div className="card__user">
            {question.user ? (
              <Link to={`/users/${question.user._id}/${question.user.name}`}>
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

        <DetailStyled className="detail">
          <div className="body">
            <div className="body__question">
              <Button
                className="body__question-button"
                onClick={this.onLikeClick.bind(this, questionId)}
              >
                Like
              </Button>
              {this.state.errors.alreadyLiked}

              {user === id ? (
                <button onClick={this.deleteQuestion.bind(this, questionId)}>
                  Delete
                </button>
              ) : null}
              <p className="paragraph">{body}</p>
            </div>

            <hr />

            <Answer />
            <hr />
            <AnswerFeed />
          </div>

          <Ads />
        </DetailStyled>
      </div>
    );
  }
}

const DetailStyled = styled.div`
  display: flex;
  padding: 4.5rem;
  background-color: ${lighterblack};
  font-size: 1.4rem;

  .body {
    background-color: ${white};
    flex: 0 0 70%;
    margin-right: 4.5rem;
    ${elevation[2]};
    padding: 3rem;

    &__question {
      display: flex;
      align-items: flex-start;
      margin-bottom: 3.5rem;

      &-button {
        margin-right: 1rem;
      }
    }

    & .paragraph {
      margin-top: -4px;
    }
  }
`;

const mapStateToProps = (state) => ({
  questionReducer: state.questionReducer,
  authReducer: state.authReducer,
  errorReducer: state.errorReducer,
});

export default connect(mapStateToProps, {
  getQuestion,
  deleteQuestion,
  likeQuestion,
  clearErrors,
})(Question);
