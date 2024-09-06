import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PagesDropdown = ({ accessToken, onPageSelect }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.get(
        `https://facebook-graph-api-tau.vercel.app/api/pages?access_token=${accessToken}`
      );
      setPages(response.data.data);
    };
    fetchPages();
  }, [accessToken]);

  const handlePageSelect = (e) => {
    const selectedPageId = e.target.value;
    const selectedPage = pages.find((page) => page.id === selectedPageId);
    if (selectedPage) {
      onPageSelect(selectedPage.id, selectedPage.access_token);
    }
  };

  return (
    <select onChange={handlePageSelect}>
      <option value="">Select a Page</option>
      {pages.map((page) => (
        <option key={page.id} value={page.id}>
          {page.name}
        </option>
      ))}
    </select>
  );
};

export default PagesDropdown;
