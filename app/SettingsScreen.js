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
