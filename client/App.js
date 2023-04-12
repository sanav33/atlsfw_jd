// This is example code to hit the server endpoint to access the posts in JSON format.
/*
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => {
  const [ip, setIp] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://<DEV_SERVER_IP>/posts/");
        const data = await response.json();
        setIp(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=700&q=60" }}/>
</View>
  );
};

export default DisplayAnImage;
*/