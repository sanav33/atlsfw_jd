import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupScreen from './SignUpScreen';
import AuthorNameScreen from './AuthorNameScreen'; // Import the AuthorNameScreen component

// Main component
const CommunityScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('Community');
    const [isSavePressed, setSavePressed] = useState(false);

    const navigateToPage = (pageName) => {
        setCurrentScreen(pageName);
    };
    const handleSavePress = () => {
      // Toggle the state when the Save button is pressed
      setSavePressed(!isSavePressed);
    };
    const navigateToAuthorPage = () => {
      setCurrentScreen('AuthorName');
    };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <View style={{ padding: 15, backgroundColor: 'green', marginTop: 32, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>COMMUNITY</Text>
      </View>

      {/* Main Content */}
      {currentScreen === 'Community' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Community Content Goes Here</Text>

          {/* Save Button */}
          <TouchableOpacity onPress={handleSavePress} style={{ marginTop: 20 }}>
            <Icon name={isSavePressed ? 'bookmark' : 'bookmark-o'} size={30} color={isSavePressed ? 'blue' : 'black'} />
          </TouchableOpacity>

          {/* Author's Name */}
          <TouchableOpacity onPress={navigateToAuthorPage} style={{ marginTop: 10 }}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Author's Name</Text>
          </TouchableOpacity>


        </View>
      ) : currentScreen === 'Signup' ? (
        <SignupScreen />
      ) : currentScreen === 'AuthorName' ? (
        <AuthorNameScreen />
      ) : null}

      {/* Navigation Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'lightgray', padding: 10 }}>
        {/* Navigation Buttons */}
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Community')}>
            <Icon name="home" size={20} color="black" alignItems="center"/>
            <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Community')}>
            <Icon name="calendar" size={20} color="black" alignItems="center"/>
            <Text>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Community')}>
            <Icon name="search" size={20} color="black" alignItems="center"/>
            <Text>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Signup')}>
            <Icon name="heart" size={20} color="black" alignItems="center"/>
            <Text>Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Signup')}>
            <Icon name="shopping-cart" size={20} color="black" alignItems="center"/>
            <Text>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigateToPage('Signup')}>
            <Icon name="home" size={20} color="black" alignItems="center"/>
            <Text>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Organization Logo */}
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Image
          source={require('./ATLSFWlogo.jpg')} // Replace with the actual path to your organization logo
          style={{ width: 150, height: 50, resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
};

export default CommunityScreen;
