import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupScreen from './SignUpScreen';
import AuthorNameScreen from './AuthorNameScreen'; // Import the AuthorNameScreen component
import Article from '../components/Article';
import axios from 'axios';
import MY_IP_ADDRESS from '../environment_variables.mjs';


var articles = []

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

    const [articleData, setArticleData] = useState()

    useEffect(() => {
      const getStuff = async () => {
        try {
    
          const response = await axios.get('http://' + MY_IP_ADDRESS + ':5050/posts');
    
          console.log(response.data);
          setArticleData(response.data);
        } catch (error) {
          console.error('Error during login:', error.message);
        }
      };
      getStuff();
    }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <View style={{ padding: 15, backgroundColor: 'green', marginTop: 32, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>COMMUNITY</Text>
      </View>

      {/* Main Content */}
      {currentScreen === 'Community' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <FlatList
          
            numColumns={2}
            data={articleData}
            keyExtractor={item => item["_id"]}
            renderItem={({ item, index}) => (
                <Article article={{title: item["article_title"],image:item["article_preview_image"], author:item["author_name"]}}></Article>
              // </View>
            )}
          />

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
