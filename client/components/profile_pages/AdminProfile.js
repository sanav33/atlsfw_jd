import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';
import hashString from '../../utils/hashingUtils.mjs';
import MY_IP_ADDRESS from '../../environment_variables.mjs';
import axios from 'axios';


const AdminProfile = () => {
  const [email, setEmail] = useState('');

  const handleAuth = async () => {
    try {

      const hashed_email = await hashString(email);

      // Send email to backend
      console.log("handling auth");
      const response = await axios.post('http://' + MY_IP_ADDRESS + ':5050/vendor', {
          hashed_email
        });
      console.log("response", response);



    } catch (error) {
      console.error('Error during authorization:', error.response.data.message);
      Alert.alert('Authorization Error', error.response.data.message,
        [{text:'Try Again',
          cancelable: true,
          },
        ],
      );
    }
  };
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Admin Profile</Text>
        <TextInput
            placeholder="Vendor Email*"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
        />

        <View style={styles.buttonContainer}>
        <Button
            title="Authorize vendor"
            color="black"
            onPress={handleAuth}
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

export default AdminProfile;