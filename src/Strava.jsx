import React, { useEffect, useState } from 'react';
// import staticFeed from '../assets/staticGoodreadsFeed.json';
 
export default function Strava() {

  const [stravaData, setStravaData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStravaData() {
      try {
        const response = await fetch(`http://localhost:3000/api/strava`);
        const data = await response.json();
        setStravaData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    fetchStravaData();
  }, []);


    return (
        <div id="strava">
            <h2>Strava</h2>
            <div>
                {JSON.stringify(stravaData[0])}
            </div>
        </div>
    )
}