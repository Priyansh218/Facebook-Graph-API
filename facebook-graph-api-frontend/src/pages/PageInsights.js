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
      {insights.map((insight, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{insight.title}</h3> {/* Display the title */}
          <p><strong>Description:</strong> {insight.description}</p> {/* Display the description */}
          
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {insight.values.map((valueObj, idx) => (
                <tr key={idx}>
                  <td>{valueObj.end_time ? new Date(valueObj.end_time).toLocaleDateString() : 'N/A'}</td> {/* Handle missing end_time */}
                  <td>
                    {/* Handle different types of value (object, number, or empty) */}
                    {typeof valueObj.value === 'object' && Object.keys(valueObj.value).length > 0
                      ? JSON.stringify(valueObj.value) // Display the object as a string
                      : typeof valueObj.value === 'number' 
                      ? valueObj.value
                      : 'No Data'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PageInsights;
