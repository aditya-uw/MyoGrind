import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EMGDataComponent = () => {
  const [emgData, setEmgData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This is where the axios.get request is made to fetch data from Adafruit IO
        const response = await axios.get('https://io.adafruit.com/api/v2/your_username/feeds/emg/data', {
          headers: {
            'X-AIO-Key': 'your_aio_key'
          }
        });

        // Setting the fetched data to the state variable
        setEmgData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Calling the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>EMG Data</h1>
      <ul>
        {emgData.map((dataPoint, index) => (
          <li key={index}>{dataPoint.value}</li>
        ))}
      </ul>
    </div>
  );
};

export default EMGDataComponent;
