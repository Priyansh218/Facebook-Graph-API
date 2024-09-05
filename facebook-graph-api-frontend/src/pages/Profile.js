import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ accessToken }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/profile?access_token=${accessToken}`
      );
      setProfile(response.data);
    };
    fetchProfile();
  }, [accessToken]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <img src={profile.picture.data.url} alt="profile" />
    </div>
  );
};

export default Profile;
