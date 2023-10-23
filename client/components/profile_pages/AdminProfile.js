import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Alert, Switch } from 'react-native';

const AdminProfile = () => {
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Admin Profile</Text>
        <TextInput
            placeholder="Do later*"
            style={styles.input}
            keyboardType="email-address"
        />

        <View style={styles.buttonContainer}>
        <Button
            title="Insert here"
            color="black"
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