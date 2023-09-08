import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
// import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Send the user data to your backend
      const response = await axios.post('http://143.215.118.140:5050/', {
          email,
          password,
        });

    console.log(response.data);
      const data = response.data;

      if (data.success) {
          console.log("successfully logged in");
        // Handle success (e.g., navigate to another screen)
      } else {
          console.log("well what about this");
          console.log(data.message);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error('Error during login:', error.response.data.message);
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
      <View style={styles.buttonContainer}>
        <Button 
          title="Login"
          color="black"
          onPress={handleLogin} />
      </View>
      
      <Text style={styles.text}>New here?</Text>
      <View>
        <Button 
          title="Sign up here!"
          color="green"
          onPress={() => navigation.navigate('Sign Up')}
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
    marginRight:90,
    marginLeft:90,
    marginTop:0,
    paddingTop:1,
    paddingBottom:1,
    backgroundColor:'lightgray',
    borderRadius:8,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 70,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8,
    marginBottom: 12,
    padding: 8,
  },
});

export default LoginScreen;