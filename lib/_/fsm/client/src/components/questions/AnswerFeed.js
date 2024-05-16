import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Actions
import { deleteAnswer } from "../../actions/questionActions";

import { Button } from "../elements";
import { elevation, white } from "../../utils";

class AnswerFeed extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }

  onAnswerDeleteClick(answerId) {
    this.props.deleteAnswer(this.props.questionReducer.question._id, answerId);
  }

  // {answer.name} - {answer.body} - {answer.date}

  render() {
    console.log("render");
    return (
      <AnswerFeedStyled className="AnswerFeed">
        {this.props.questionReducer.question.answers.map((answer) => {
          return (
            <div className="Answer" key={answer._id}>
              <div className="Answer__text">{answer.body}</div>

              <div className="Answer__user">
                <Link to={`/users/${answer.user}/${answer.name}`}>
                  <div className="Answer__user__name">{answer.name}</div>
                </Link>
                {this.props.authReducer.user.id === answer.user ? (
                  <Button.Delete
                    className="Answer__user__delete"
                    onClick={this.onAnswerDeleteClick.bind(this, answer._id)}
                  >
                    Delete
                  </Button.Delete>
                ) : null}
              </div>
            </div>
          );
        })}
      </AnswerFeedStyled>
    );
  }
}

const AnswerFeedStyled = styled.div`
  /* background-color: yellowgreen;  */
  /* flex: 1;    */
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;

  .Answer {
    background-color: ${white};
    ${elevation[1]};
    padding: 3rem;
    margin-bottom: 3.5rem;

    &__text {
      margin-bottom: 2rem;
    }

    &__user {
      display: flex;
      /* justify-content: space-between; */
      align-items: center;

      & a {
        margin-right: auto;
      }
    }

    &__delete {
    }
  }
`;

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  questionReducer: state.questionReducer,
});

export default connect(mapStateToProps, { deleteAnswer })(AnswerFeed);
