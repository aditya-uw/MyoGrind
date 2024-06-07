import React, { useState, useEffect } from 'react';

const SettingScreen = () => {
  const [battery, setBattery] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(null);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    // Simulating fetching data
    const fetchSettings = () => {
      setBattery(0.75); // Simulated battery level (75%)
      setNetworkStatus('Connected'); // Simulated network status
      setStorage({ used: 45, total: 100 }); // Simulated storage space (45GB used out of 100GB)
    };

    fetchSettings();
  }, []);

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <h2>Battery Life</h2>
        {battery !== null ? (
          <p>{(battery * 100).toFixed(0)}%</p>
        ) : (
          <p>Fetching battery level...</p>
        )}
      </div>
      <div>
        <h2>Network Status</h2>
        {networkStatus !== null ? (
          <p>{networkStatus}</p>
        ) : (
          <p>Fetching network status...</p>
        )}
      </div>
      <div>
        <h2>Storage</h2>
        {storage !== null ? (
          <p>{storage.used}GB used out of {storage.total}GB</p>
        ) : (
          <p>Fetching storage information...</p>
        )}
      </div>
      <div>
        <h2>Other Settings</h2>
        <p>Placeholder for other settings</p>
      </div>
    </div>
  );
};

export default SettingScreen;
