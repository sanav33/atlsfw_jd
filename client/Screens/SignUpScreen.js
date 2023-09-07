import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
// import axios from 'axios';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [subscribed_to_news, setSubscribedToNews] = useState('');
  const [gender, setGender] = useState('');


  const handleSignUp = async () => {
    try {
      // Send the user data to your backend
      const response = await axios.post('http://143.215.118.140:5050/signup', {
          email,
          password,
          first_name,
          last_name,
          username,
          birthday,
          gender,
          phone_number,
          subscribed_to_news,
        });

      const data = response.data;

      if (data.success) {
          console.log("successfully signed user up");
        // Handle success (e.g., navigate to another screen)
      } else {
          console.log("signup failed");
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