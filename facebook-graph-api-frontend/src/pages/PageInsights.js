import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PageInsights = ({ accessToken, pageId, since, until }) => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const response = await axios.get(
        `https://facebook-graph-api-tau.vercel.app/api/page-insights?page_id=${pageId}&access_token=${accessToken}&since=${since}&until=${until}`
      );
      setInsights(response.data.data);
    };
    fetchInsights();
  }, [accessToken, pageId, since, until]);

  if (!insights) return <p>Loading...</p>;

  return (
    <div>
      <h2>Page Insights</h2>
      {insights.map((insight, index) => (
        <div key={index}>
          <p>{insight.title}: {insight.values[0].value}</p>
        </div>
      ))}
    </div>
  );
};

export default PageInsights;
