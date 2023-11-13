import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthorNameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Author's Name</Text>
      <Text style={styles.bio}>
        Hello! This is a brief bio about (Author's Name).
        {/* Add your bio content here */}
      </Text>
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
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AuthorNameScreen;