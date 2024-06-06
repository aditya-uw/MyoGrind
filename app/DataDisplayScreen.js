//json
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


//csv
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// const DataDisplayScreen = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("Fetching data...");
//       try {
//         const response = await fetch('http://192.168.0.108:3000/data'); // Use the IP address shown by Expo
//         console.log("Response received: ", response);
//         const jsonData = await response.json();
//         console.log("Fetched Data: ", jsonData); // Log fetched data
//         if (response.ok) {
//           setData(jsonData);
//           console.log("Data set to state: ", jsonData); // Log data being set to state
//           setLoading(false);
//         } else {
//           console.error("Response not OK");
//           throw new Error('Data fetch failed');
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.item}>
//         {Object.entries(item).map(([key, value], index) => (
//           <Text key={index}>{`${key}: ${value}`}</Text> // Display the key and value
//         ))}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>EMG DATA Display Here</Text>
//       {loading ? (
//         <ActivityIndicator size="large" />
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//   },
// });

// export default DataDisplayScreen;









//original
// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// const DataDisplayScreen = () => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://10.19.7.87:3000/data'); // Replace with your local IP address
//                 const jsonData = await response.json();
//                 if (response.ok) {
//                     setData(jsonData);
//                     setLoading(false);
//                 } else {
//                     throw new Error('Data fetch failed');
//                 }
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     return (
//         <View style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" />
//             ) : error ? (
//                 <Text style={styles.errorText}>{error}</Text>
//             ) : (
//                 <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     dataText: {
//         fontSize: 16,
//         color: 'black',
//     },
//     errorText: {
//         fontSize: 16,
//         color: 'red',
//     }
// });

// export default DataDisplayScreen;
