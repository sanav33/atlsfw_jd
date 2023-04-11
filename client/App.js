import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const article_img = await fetch(
  "localhost:5050/posts/"
);
const ip = '1';
const DisplayAnImage = () => {
  return (
    <View style={styles.container}>
      <Text>{ip}</Text>
    </View>
  );
};

export default DisplayAnImage;