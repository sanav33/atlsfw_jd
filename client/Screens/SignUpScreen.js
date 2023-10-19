import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';
import axios from 'axios';
import hashString from '../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../environment_variables.mjs';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [agreeSubscribe, setAgreeSubscribe] = useState(false);
  //encrypted email

  const handleSignUp = async () => {
    try {
      const hashed_email = await hashString(email);
      const hashed_password = await hashString(password);

      // Send the user data to your backend
      let userData = {
        first_name: firstName,
        last_name: lastName,
        username,
        hashed_email,
        hashed_password,
        phone_number: phoneNum,
        //just to keep the format consistent, might as well do birthday: birthday, gender: gender
        birthday,
        gender,
        subscribed_to_news: agreeSubscribe,
        //encrypted email
      };

      const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/signup', userData);

      const data = response.data;
      if (data.success) {
        Alert.alert('Success', 'Account created successfully!', [{ text: 'OK' }]);
        navigation.navigate('Log In');
      } else {
        Alert.alert('Error', data.message, [{ text: 'Try Again' }]);
      }
    } catch (error) {
      console.error('Error during sign up:', error.response.data.message);
      Alert.alert('Sign Up Error', error.response.data.message, [{ text: 'Try Again' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an Account</Text>

      <TextInput
        placeholder="First Name*"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name*"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Username*"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password*"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNum}
        onChangeText={setPhoneNum}
        style={styles.input}
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Birthday (yyyy-mm-dd)"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Subscribe to our newsletter? </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={agreeSubscribe ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setAgreeSubscribe(previousState => !previousState)}
          value={agreeSubscribe}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          color="black"
          onPress={handleSignUp}
        />
      </View>

      <Text style={styles.text}>Already have an account?</Text>
      <View>
        <Button
          title="Log in here!"
          color="green"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 60,
  },
  buttonContainer: {
    marginVertical: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
  },
});

export default SignUpScreen;
