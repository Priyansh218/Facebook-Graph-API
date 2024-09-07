import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import PageInsights from './pages/PageInsights';
import PagesDropdown from './pages/PagesDropDown';
import Profile from './pages/Profile';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [selectedPageData, setSelectedPageData] = useState({
    pageId: "",
    pageAccessToken: ""
  });

  // Get the access token from the URL query parameters after login
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
      // Optionally, remove the token from the URL for security
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const handlePageSelect = (pageId, pageAccessToken) => {
    setSelectedPageData({ pageId, pageAccessToken }); 
  };

  console.log(selectedPageData)

  return (
    <div>
      {!accessToken ? (
        <Login />
      ) : (
        <>
          <Profile accessToken={accessToken} />
          <PagesDropdown accessToken={accessToken} onPageSelect={handlePageSelect} />
          {selectedPageData.pageId && (
            <PageInsights
              accessToken={selectedPageData.pageAccessToken}
              pageId={selectedPageData.pageId}
              since="2024-08-01"
              until="2024-10-31"
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

