import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PagesDropdown = ({ accessToken, onPageSelect }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/pages?access_token=${accessToken}`
      );
      setPages(response.data.data);
    };
    fetchPages();
  }, [accessToken]);

  return (
    <select onChange={(e) => onPageSelect(e.target.value)}>
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
