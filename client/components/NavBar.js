// import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, View, StyleSheet, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

const NavBar = () => {
  const navigation = useNavigation();
    // To add new navigation route:
    // onPress={() => navigation.navigate('new_screen_name_here')}
    // new screen name MUST match Stack.Screen name prop in App.js

    const isLogged = useSelector((store) => store.isLogged.isLogged);
    const handleProfileClick = () => {
      if (isLogged) {
        navigation.navigate('Profile'); // Navigate to Profile if logged in
      } else {
        navigation.navigate('Log In'); // Navigate to Login if not logged in
      }
    }

  return (
        <View>
        {/* Nav Bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'lightgray', padding: 10 }}>
          {/* Navigation Buttons */}
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Community')}>
              <Icon name="home" size={20} color="black" alignItems="center"/>
              <Text>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Community')}>
              <Icon name="calendar" size={20} color="black" alignItems="center"/>
              <Text>Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Community')}>
              <Icon name="search" size={20} color="black" alignItems="center"/>
              <Text>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Sign Up')}>
              <Icon name="bookmark" size={20} color="black" alignItems="center"/>
              <Text>Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Sign Up')}>
              <Icon name="shopping-cart" size={20} color="black" alignItems="center"/>
              <Text>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleProfileClick()}>
              <Icon name="home" size={20} color="black" alignItems="center"/>
              <Text>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* LOGO */}
        <View style={{ alignItems: 'center', paddingBottom: 20 }}>
          <Image
            source={require('./ATLSFWlogo.jpg')}
            style={{ width: 150, height: 50, resizeMode: 'contain' }}
          />
        </View>
        
        </View>
  );
}

export default NavBar;