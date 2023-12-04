import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import MY_IP_ADDRESS from "../environment_variables.mjs";
import { useSelector } from "react-redux";

const DiscoveryPageCreation = () => {
  const [brand_name, setBrandName] = useState('');
  const [shop_now_link, setShopNowLink] = useState('');
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const userInfo = useSelector((store) => store.userInfo.userInfo);

  const handleSubmit = async () => {
    try {
      vendor_id = userInfo["_id"];
      console.log('hi');
      const url = `http://${MY_IP_ADDRESS}:5050/discover/create/`+vendor_id;
      const payload = {
        brand_name: brand_name,
        shop_now_link: shop_now_link,
        title: title,
        intro: intro,
      };
      console.log(userInfo);
      console.log('Payload:', payload);
      const response = await axios.post(url, payload);
      console.log(response.status);

      if (response.status == 200) {
        Alert.alert('Discovery Page Created Successfully');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the discovery page');
    }
  };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Brand Name" onChangeText={setBrandName} value={brand_name}/>
                <TextInput style={styles.input} placeholder="Shop Now Link" onChangeText={setShopNowLink} value={shop_now_link}/>
                <TextInput style={styles.input} placeholder="Vendor Role Title" onChangeText={setTitle} value={title}/>
                <TextInput style={styles.input} placeholder="Organization Bio" onChangeText={setIntro} value={intro}/>
                <Button title="Submit Information" onPress={handleSubmit} onFocus={() => Alert.alert("Please check the information above, you cannot change it later!")}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default DiscoveryPageCreation;