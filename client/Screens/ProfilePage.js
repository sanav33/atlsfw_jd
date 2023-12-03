import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';
import axios from 'axios';
import hashString from '../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../environment_variables.mjs';
import { isValidPassword, isValidEmail } from '../utils/format.mjs';
import { useSelector, useDispatch } from 'react-redux';
import VendorProfile from '../components/profile_pages/VendorProfile';
import UserProfile from '../components/profile_pages/UserProfile';
import AdminProfile from '../components/profile_pages/AdminProfile';

const ProfilePage = ({ navigation }) => {

    const account_type = useSelector((store) => store.acct_type.acct_type);
    //const account_type = 2; //hardcode to test

  let content;

    if (account_type === 1) {
      content = <AdminProfile/>;
    } else if (account_type === 2) {
      content = <VendorProfile/>;
    } else if (account_type === 3) {
      content = <UserProfile/>;
    } else {
      console.log("hello this account type doesnt exist");
      // content = null;
      navigation.replace("Log In");
      return null;
    }


    const [email, setEmail] = useState('');
    //encrypted email
  
    const verifyEmail = async () => {
      try {
        const hashed_email = await hashString(email);
        
        if (!isValidEmail(email)) {
            Alert.alert('Error', "Email format is invalid", [{ text: 'Try Again' }]);
        } else {
            Alert.alert('Valid email!', "not done yet", [{ text: 'Exit' }]);
        }
        
      } catch (error) {
        console.error('Error during sign up:', error.response.data.message);
        Alert.alert('Sign Up Error', error.response.data.message, [{ text: 'Try Again' }]);
      }
    };
  
    return (
      <View style={{ flex: 1 }}>
        {content}
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
  