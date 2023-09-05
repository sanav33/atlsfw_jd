import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Send the user data to your backend
      const response = await axios.post('http://143.215.118.140:5050/', {
          email,
          password
        });

      const data = response.data;

      if (data.success) {
        // Handle success (e.g., navigate to another screen)
      } else {
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default SignUpScreen;
