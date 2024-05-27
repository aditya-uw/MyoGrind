# MyoGrind
EE/BIOEN 461/561: Neural Engineering Tech Studio

Sure! Here is a comprehensive README file for your GitHub repository, detailing how to set up and use your React Native application with Bluetooth functionality.

### README.md

```markdown
# EMG Data Viewer App

This repository contains a React Native application for viewing EMG data transmitted from an Arduino device via Bluetooth. The app includes screens for user login, data display, and device settings, allowing users to monitor and control various aspects of the connected Arduino device.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screens](#screens)
  - [Login Screen](#login-screen)
  - [Data Display Screen](#data-display-screen)
  - [Settings Screen](#settings-screen)
- [Bluetooth Integration](#bluetooth-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js and npm (or Yarn)
- React Native CLI or Expo CLI
- An Arduino device with a Bluetooth module

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/emg-data-viewer-app.git
   cd emg-data-viewer-app
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Start the development server:**

   For React Native CLI:

   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

   For Expo CLI:

   ```bash
   expo start
   ```

## Usage

### Running the App

After setting up the development environment, you can run the app on your connected device or emulator. The initial screen will be the Login screen.

### Navigation

- **Login Screen:** Enter credentials and navigate to the Data Display screen.
- **Data Display Screen:** View EMG data received via Bluetooth and navigate to the Settings screen.
- **Settings Screen:** Control vibration motor level and view device battery level and SD card capacity.

## Screens

### Login Screen

`LoginScreen.js` handles user authentication and navigation to the Data Display screen.

```javascript
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Perform login logic here
    // After successful login, navigate to DataDisplayScreen
    navigation.navigate('DataDisplay');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default LoginScreen;
```

### Data Display Screen

`DataDisplayScreen.js` displays EMG data received from the Arduino device and includes navigation to the Settings screen.

```javascript
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const DataDisplayScreen = ({ navigation }) => {
  const [emgData, setEmgData] = useState([]);

  const connectToBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'YourDeviceName' }],
        optionalServices: ['your-service-uuid']
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('your-service-uuid');
      const characteristic = await service.getCharacteristic('your-characteristic-uuid');

      await characteristic.startNotifications();
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
    <View style={styles.container}>
      <Text style={styles.title}>EMG Data via Bluetooth</Text>
      <Button title="Connect to Bluetooth" onPress={connectToBluetooth} />
      <FlatList
        data={emgData}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DataDisplayScreen;
```

### Settings Screen

`SettingsScreen.js` allows users to control the vibration motor level and view device battery level and SD card capacity.

```javascript
import React, { useState } from 'react';
import { View, Text, Slider, Button, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const [vibrationLevel, setVibrationLevel] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(100); // Mock value, will be updated from Arduino
  const [sdCardCapacity, setSdCardCapacity] = useState(100); // Mock value, will be updated from Arduino

  const updateVibrationLevel = (value) => {
    setVibrationLevel(value);
    // Send the vibration level to the Arduino
    // TODO: Implement the Bluetooth communication to send this value to the Arduino
  };

  const fetchDeviceStatus = async () => {
    // Fetch battery level and SD card capacity from Arduino
    // TODO: Implement the Bluetooth communication to get these values from the Arduino
    // For now, let's mock these values
    setBatteryLevel(85); // Example value
    setSdCardCapacity(50); // Example value
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.setting}>
        <Text>Vibration Motor Level: {vibrationLevel}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={vibrationLevel}
          onValueChange={updateVibrationLevel}
        />
      </View>
      <View style={styles.setting}>
        <Text>Battery Level: {batteryLevel}%</Text>
      </View>
      <View style={styles.setting}>
        <Text>SD Card Capacity: {sdCardCapacity}%</Text>
      </View>
      <Button title="Fetch Device Status" onPress={fetchDeviceStatus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  setting: {
    marginBottom: 24,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default SettingsScreen;
```

## Bluetooth Integration

This app uses the Web Bluetooth API to communicate with an Arduino device. Ensure your device's Bluetooth service UUID and characteristic UUID are correctly configured in the `DataDisplayScreen.js` and `SettingsScreen.js` files.

### Connecting to Bluetooth

In `DataDisplayScreen.js` and `SettingsScreen.js`, replace the placeholders with the actual UUIDs and device name:

```javascript
const device = await navigator.bluetooth.requestDevice({
  filters: [{ namePrefix: 'YourDeviceName' }],
  optionalServices: ['your-service-uuid']
});
```

Ensure your development environment supports HTTPS, as the Web Bluetooth API requires a secure context.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
```

### Summary

This README provides a comprehensive guide for users to understand the purpose, setup, and usage of your EMG Data Viewer App. It includes instructions for installation, usage, a detailed description of each screen, and the necessary steps for integrating Bluetooth communication.
