import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const DataDisplayScreen = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://10.118.214.113:3000/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>Index: {index}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Start Time: {item["start_time (HH:MM:SS.f)"]}</Text>
      <Text>End Time: {item["end_time (HH:MM:SS.f)"]}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Display</Text>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DataDisplayScreen;
