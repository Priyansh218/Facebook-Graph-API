import React from 'react';

const Login = () => {
  const handleLogin = () => {
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=pages_read_engagement,read_insights,pages_read_user_content,pages_show_list,public_profile,pages_manage_metadata,pages_manage_engagement`;

  };

  return (
    <div>
      <h1>Login with Facebook</h1>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  );
};

export default Login;
