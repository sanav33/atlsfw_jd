import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import encryptWithPublicKey from '../utils/encryptionUtils.mjs';
import hashString from '../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../environment_variables.mjs';
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
      // const encrypted_email = encryptWithPublicKey(email);
      // const encrypted_password = encryptWithPublicKey(password);
      const hashed_email = await hashString(email);
      const encrypted_email = encryptWithPublicKey(email);
      const hashed_password = await hashString(password);
      console.log("email and pw hashed", hashed_email);
      // Send the user data to your backend
      const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/signup', {
          hashed_email,
          encrypted_email,
          hashed_password,
          // first_name,
          // last_name,
          // username,
          // birthday,
          // gender,
          // phone_number,
          // subscribed_to_news,
        });

      const data = response.data;

      if (data.success) {
          console.log("successfully signed user up");
        // Handle success (e.g., navigate to another screen)
          Alert.alert('Signup Successful!', "Go back to the login screen to log in.",
            [{text:'OK',
              cancelable: true,
              },
            ],
          );
      } else {
          console.log("signup failed");

      }
    } catch (error) {
        console.error('Error during sign-up:', error);
        // Handle error (e.g., display an error message)
        Alert.alert('Signup Error', error.response.data.message,
          [{text:'Try Again',
            cancelable: true,
            },
          ],
        );
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