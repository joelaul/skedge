import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return <div>{user && user.name}'s profile</div>;
};

export default Profile;
