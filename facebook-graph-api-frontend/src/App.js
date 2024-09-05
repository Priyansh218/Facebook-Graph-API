import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import PageInsights from './pages/PageInsights';
import PagesDropdown from './pages/PagesDropDown';
import Profile from './pages/Profile';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);

  // Get the access token from the URL query parameters after login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    if (token) setAccessToken(token);
  }, []);

  return (
    <div>
      {!accessToken ? (
        <Login />
      ) : (
        <>
          <Profile accessToken={accessToken} />
          <PagesDropdown accessToken={accessToken} onPageSelect={setSelectedPageId} />
          {selectedPageId && (
            <PageInsights
              accessToken={accessToken}
              pageId={selectedPageId}
              since="2024-01-01"
              until="2024-09-01"
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
