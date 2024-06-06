import React, { useState } from 'react';

const BluetoothEMGComponent = () => {
  const [emgData, setEmgData] = useState([]);

  const connectToBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['your-service-uuid'] }]
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('your-service-uuid');
      const characteristic = await service.getCharacteristic('your-characteristic-uuid');

      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
    } catch (error) {
      console.error('Bluetooth connection failed', error);
    }
  };

  const handleCharacteristicValueChanged = (event) => {
    const value = new TextDecoder().decode(event.target.value);
    setEmgData((prevData) => [...prevData, value]);
  };

  return (
    <div>
      <h1>EMG Data via Bluetooth</h1>
      <button onClick={connectToBluetooth}>Connect to Bluetooth</button>
      <ul>
        {emgData.map((dataPoint, index) => (
          <li key={index}>{dataPoint}</li>
        ))}
      </ul>
    </div>
  );
};

export default BluetoothEMGComponent;
