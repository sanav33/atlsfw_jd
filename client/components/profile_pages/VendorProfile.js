import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';

const VendorProfile = () => {

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
    <View style={styles.container}>
        <Text style={styles.text}>Vendor Profile Page</Text>
        <TextInput
            placeholder="To do*"
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

export default VendorProfile;