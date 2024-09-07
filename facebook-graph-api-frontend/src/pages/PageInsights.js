import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageInsights = ({ accessToken, pageId, since, until }) => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const response = await axios.get(
        `https://facebook-graph-api-tau.vercel.app/api/page-insights?page_id=${pageId}&access_token=${accessToken}&since=${since}&until=${until}`
      );
      setInsights(response.data.data || []);
    };
    fetchInsights();
  }, [accessToken, pageId, since, until]);
  console.log(insights)
  if (!insights) return <p>Loading...</p>;

  return (
    <div>
      <h2>Page Insights</h2>
      {insights.length === 0 ? (
        <p>No insights available</p>
      ) : (
        insights.map((insight, index) => (
          <div key={index}>
            <h3>{insight.title}</h3>
            <p>{insight.description}</p>
            <ul>
              {insight.values[0].map((entry, idx) => (
                <li key={idx}>
                  Date: {new Date(entry.end_time).toLocaleDateString()} - Value: {entry.value}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PageInsights;
