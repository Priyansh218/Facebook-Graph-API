import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=read_insights,pages_show_listpages_read_engagement,pages_manage_metadata,pages_read_user_content,public_profile,pages_manage_engagement,pages_manage_posts`;

  };

  return (
    <div>
      <h1>Login with Facebook</h1>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;
