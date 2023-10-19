import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';
import axios from 'axios';
import hashString from '../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../environment_variables.mjs';
import { isValidPassword, isValidEmail } from '../utils/format.mjs';

const ProfilePage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    //encrypted email
  
    const verifyEmail = async () => {
      try {
        const hashed_email = await hashString(email);
        
        if (!isValidEmail(email)) {
            Alert.alert('Error', "Email format is invalid", [{ text: 'Try Again' }]);
        } else {
            Alert.alert('Valid email!', "not done yet", [{ text: 'Exit' }]);
        //   // Send the user data to your backend
        //   let userData = {
        //     first_name: firstName,
        //     last_name: lastName,
        //     username,
        //     hashed_email,
        //     hashed_password,
        //     phone_number: phoneNum,
        //     //just to keep the format consistent, might as well do birthday: birthday, gender: gender
        //     birthday,
        //     gender,
        //     subscribed_to_news: agreeSubscribe,
        //     //encrypted email
        //   };
  
        //   const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/signup', userData);
  
        //   const data = response.data;
        //   if (data.success) {
        //     Alert.alert('Success', 'Account created successfully!', [{ text: 'OK' }]);
        //     navigation.navigate('Log In');
        //   } else {
        //     Alert.alert('Error', data.message, [{ text: 'Try Again' }]);
        //   }
        }
        
      } catch (error) {
        console.error('Error during sign up:', error.response.data.message);
        Alert.alert('Sign Up Error', error.response.data.message, [{ text: 'Try Again' }]);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Authorized Vendor Email</Text>
        <TextInput
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
  
        <View style={styles.buttonContainer}>
          <Button
            title="Verify"
            color="black"
            onPress={verifyEmail}
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
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20,
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
  
  export default ProfilePage;
  