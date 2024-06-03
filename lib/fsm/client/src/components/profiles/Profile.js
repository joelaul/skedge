import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Actions
import { getProfile } from "../../actions/profileActions";
import { getUserQuestions } from "../../actions/questionActions";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile(this.props.match.params.id);
    this.props.getUserQuestions(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getProfile(this.props.match.params.id);
      this.props.getUserQuestions(this.props.match.params.id);
    }
  }

  render() {
    const { id, name } = this.props.authReducer.user;
    const paramsId = this.props.match.params.id;

    let isOnOwnProfilePage;
    if (id === paramsId) isOnOwnProfilePage = true;

    // User is logged-in, on own profile page, but no profile data
    if (isOnOwnProfilePage && this.props.profileReducer.profile === null) {
      return (
        <div>
          <p>Welcome {name}</p>
          <Link to={`/users/${id}/${name}/edit`}>Edit Profile</Link>
          <p>You have not yet setup your profile. Please add some info.</p>
        </div>
      );
    }

    // Check if other user has a blank profile
    if (this.props.profileReducer.profile === null) {
      return (
        <div>
          <p>User has not yet completed their profile</p>
        </div>
      );
    }

    // Response if user id does not exist
    if (this.props.profileReducer.profile === "no user") {
      return (
        <div>
          <p>Sorry. This user doesn't exist</p>
        </div>
      );
    }

    // Display profile data whether logged-in or out
    const { displayName, location, bio, website, social, bands, instruments } =
      this.props.profileReducer.profile;
    const { questions } = this.props.questionReducer;

    return (
      <div className="Profile">
        {isOnOwnProfilePage ? (
          <Link to={`/users/${id}/${name}/edit`}>Edit Profile</Link>
        ) : null}

        <h3>About {displayName}</h3>
        <p>Location: {location}</p>
        <p>Bio: {bio}</p>
        <p>Website: {website}</p>

        {social ? (
          <div>
            <h3>Social</h3>
            <p>Youtube: {social.youtube}</p>
            <p>Twitter: {social.twitter}</p>
            <p>Facebook: {social.facebook}</p>
            <p>LinkedIn: {social.linkedin}</p>
            <p>Instagram: {social.instagram}</p>
          </div>
        ) : null}

        <h3>Bands</h3>
        <p>{bands}</p>

        <h3>Instruments</h3>
        <p>{instruments}</p>

        <h3>Questions Asked:</h3>

        <ul>
          {questions.map((question) => {
            return (
              <li key={question._id}>
                {question.title} - {question.date}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileReducer: state.profileReducer,
  questionReducer: state.questionReducer,
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { getProfile, getUserQuestions })(
  Profile,
);
