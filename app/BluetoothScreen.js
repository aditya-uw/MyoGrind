// BluetoothScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import knex from './database'; // import knex configuration

const BluetoothScreen = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const connectToArduino = () => {
        setIsConnecting(true);
        setError('');
        BluetoothSerial.connect('xx:xx:xx:xx:xx:xx')
            .then((res) => {
                setIsConnected(true);
                setIsConnecting(false);
                BluetoothSerial.on('data', (data) => {
                    const jsonData = JSON.parse(data.data);
                    setData(jsonData);
                    insertDataIntoDatabase(jsonData); // Function to insert data into the database
                });
            })
            .catch((err) => {
                console.log(err.message);
                setError(`Connection failed: ${err.message}`);
                setIsConnecting(false);
            });
    };

    const insertDataIntoDatabase = (jsonData) => {
        knex('your_table_name') // Specify your table name here
            .insert(jsonData)
            .then(() => console.log('Data inserted'))
            .catch(err => console.error('Error inserting data', err));
    };

    useEffect(() => {
        BluetoothSerial.isEnabled()
            .then((enabled) => {
                if (!enabled) {
                    BluetoothSerial.enable()
                        .then(() => console.log('Bluetooth enabled'))
                        .catch((err) => console.log(err.message));
                }
            });

        return () => {
            BluetoothSerial.disconnect(); // Disconnect on cleanup
        };
    }, []);

    return (
        <View style={styles.container}>
            <Button onPress={connectToArduino} title="Connect to Arduino" disabled={isConnecting || isConnected} />
            {isConnecting && <ActivityIndicator size="large" />}
            {isConnected ? <Text>Received Data: {JSON.stringify(data)}</Text> : <Text>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BluetoothScreen;
