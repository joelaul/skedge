import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/isEmpty";

// Actions
import {
  createProfile,
  deleteAccount,
  getProfile,
} from "../../actions/profileActions";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      location: "",
      bio: "",
      website: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      bands: "",
      instruments: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== this.props.authReducer.user.id) {
      this.props.history.push("/");
    }

    this.props.getProfile(this.props.match.params.id);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      displayName: this.state.displayName,
      location: this.state.location,
      bio: this.state.bio,
      website: this.state.website,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      bands: this.state.bands,
      instruments: this.state.instruments,
    };

    this.props.createProfile(
      profileData,
      this.props.history,
      this.props.authReducer.user.id,
      this.props.authReducer.user.name,
    );
  };

  componentWillReceiveProps(nextProps) {
    this.checkForErrors(nextProps);

    if (nextProps.authReducer.isAuthenticated === false) {
      this.props.history.push("/");
    }
    if (nextProps.profileReducer.profile) {
      const { profile } = nextProps.profileReducer;

      const bandsCSV = profile.bands.join(",");
      const instrumentsCSV = profile.instruments.join(",");

      profile.displayName = !isEmpty(profile.displayName)
        ? profile.displayName
        : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.bands = !isEmpty(profile.bands) ? profile.bands : "";
      profile.instruments = !isEmpty(profile.instruments)
        ? profile.instruments
        : "";

      this.setState({
        displayName: profile.displayName,
        location: profile.location,
        bio: profile.bio,
        website: profile.website,
        youtube: profile.social.youtube,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        instagram: profile.social.instagram,
        bands: bandsCSV,
        instruments: instrumentsCSV,
      });
    }
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount();
  };

  checkForErrors = (nextProps) => {
    if (nextProps.errorReducer) {
      this.setState({ errors: nextProps.errorReducer });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="ProfileEdit">
        <p>Enter some of your profile info.</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="displayName"
            placeholder="displayName"
            value={this.state.displayName}
            onChange={this.onChange}
          />
          {errors.displayName}
          <input
            type="text"
            name="location"
            placeholder="location"
            value={this.state.location}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="bio"
            placeholder="bio"
            value={this.state.bio}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="website"
            placeholder="website"
            value={this.state.website}
            onChange={this.onChange}
          />
          {errors.website}
          <input
            type="text"
            name="youtube"
            placeholder="youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />
          {errors.youtube}
          <input
            type="text"
            name="twitter"
            placeholder="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />
          {errors.twitter}
          <input
            type="text"
            name="facebook"
            placeholder="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />
          {errors.facebook}
          <input
            type="text"
            name="linkedin"
            placeholder="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />
          {errors.linkedin}
          <input
            type="text"
            name="instagram"
            placeholder="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />
          {errors.instagram}
          <input
            type="text"
            name="bands"
            placeholder="bands"
            value={this.state.bands}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="instruments"
            placeholder="instruments"
            value={this.state.instruments}
            onChange={this.onChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.onDeleteClick}>Delete My Account</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  profileReducer: state.profileReducer,
  errorReducer: state.errorReducer,
});

export default connect(mapStateToProps, {
  createProfile,
  deleteAccount,
  getProfile,
})(ProfileEdit);
