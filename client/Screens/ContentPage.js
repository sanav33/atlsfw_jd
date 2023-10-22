import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, TextInput, Modal, Button, StyleSheet } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import Icon from 'react-native-vector-icons/FontAwesome';
import SignupScreen from './SignUpScreen';
import AuthorNameScreen from './AuthorNameScreen'; // Import the AuthorNameScreen component
import Article from '../components/Article';
import axios from 'axios';
import MY_IP_ADDRESS from '../environment_variables.mjs';
import { set_tags_list } from '../redux/actions/tagsAction';
import { add_tag, remove_tag } from '../redux/actions/tagsAction';
import { useSelector } from 'react-redux';

// Main component
const CommunityScreen = () => {
    const [currentScreen, setCurrentScreen] = useState('Community');
    const [isSavePressed, setSavePressed] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false); // For filter modal visibility
    // const [tags, setTags] = useState([]);  // State for the tags

    //tags redux state here
    const tags_list = useSelector((store) => store.tags_list.tags_list);

    // TODO: wtf is this, how does she track previous tags?????
    // const [inputTag, setInputTag] = useState([]); // For input field

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

    useEffect(() => {
      // Fetch tags from the new endpoint
      const fetchTags = async () => {
          try {
              const url = `http://${MY_IP_ADDRESS}:5050/tags`;
              const response = await axios.get(url);
              if (response.data && Array.isArray(response.data)) {
                //dispatch tags state here
                set_tags_list(response.data);
                console.log("it's here", response.data);
                  // setTags(response.data);
              }
          } catch (error) {
              console.error('Error fetching tags:', error.message);
          }
      };
      fetchTags();
  }, []);

  const handleTagPress = (tag) => {
    console.log("TAG LIST B4 PRESS",tags_list);
    if (tags_list.includes(tag)) {
      // Remove the tag if it's already selected
      remove_tag(tag);
    } else {
      // Add the tag if it's not selected
      add_tag(tag);
    }
    console.log("TAG LIST AFTER PRESS",tags_list);
      // if (inputTag.includes(tag)) {
      //     // Remove the tag if it's already selected
      //     setInputTag(prevTags => prevTags.filter(t => t !== tag));
      // } else {
      //     // Add the tag if it's not selected
      //     setInputTag(prevTags => [...prevTags, tag]);
      // }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main Content */}
      {currentScreen === 'Community' ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          {/* Filter Icon */}
          <TouchableOpacity onPress={() => setShowFilterModal(true)} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
            <Icon name="filter" size={30} color="black" />
          </TouchableOpacity>

          <FlatList
            numColumns={2}
            data={articleData}
            keyExtractor={item => item["_id"]}
            renderItem={({ item, index}) => (
                <Article article={{
                  title: item["article_title"], 
                  image:item["article_preview_image"], 
                  author:item["author_name"], 
                  likes:item["like_count"],
                  article_id:item["_id"],
                }}></Article>
            )}
          />
        </View>
        
      ) : currentScreen === 'Signup' ? (
        <SignupScreen />
      ) : currentScreen === 'AuthorName' ? (
        <AuthorNameScreen />
      ) : null}

      {/* Filter Modal */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={showFilterModal}
          onRequestClose={() => {
              setShowFilterModal(!showFilterModal);
          }}
      >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ height: 350, width: 350, padding: 30, backgroundColor: 'white', borderRadius: 10 }}>
                {/* Close Button */}
                <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={() => setShowFilterModal(false)}
                >
                    <Icon name="times" size={20} color="black" />
                </TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                      <TextInput value={tags_list.toString()} placeholder="Search filters..." style={{ flex: 1, borderColor: 'gray', borderWidth: 1, padding: 5, borderRadius: 5 }} editable={false} />
                      <TouchableOpacity style={{ marginLeft: 10 }}>
                          <Icon name="filter" size={20} color="black" />
                      </TouchableOpacity>
                  </View>
                  {/* Container for filter buttons */}
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                          <TouchableOpacity
                              key={"hehe"}
                              // onPress={() => handleTagPress(tag)}
                              style={[
                                  styles.tagButtonSelected,
                                  // tags_list.includes(tag) && styles.tagButtonSelected
                              ]}
                          >
                              <Text style={styles.tagTextSelected}>{"hehehehe"}</Text>
                          </TouchableOpacity>
                    
                      {/* {tags_list.map(tag => (
                          <TouchableOpacity
                              key={tag}
                              onPress={() => handleTagPress(tag)}
                              style={[
                                  styles.tagButton,
                                  tags_list.includes(tag) && styles.tagButtonSelected
                              ]}
                          >
                              <Text style={tags_list.includes(tag) ? styles.tagTextSelected : styles.tagText}>{tag}</Text>
                          </TouchableOpacity>
                      ))} */}
                  </View>
              </View>
          </View>
      </Modal>

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
          source={require('./ATLSFWlogo.jpg')}
          style={{ width: 150, height: 50, resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
};

// New StyleSheet for the tag buttons
const styles = StyleSheet.create({
  tagButton: {
      padding: 5,
      width: '48%',
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 5,
      marginRight: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF', 
  },
  tagButtonSelected: {
      backgroundColor: '#C1E1C1',
  },
  tagText: {
      color: 'black',
  },
  tagTextSelected: {
      color: 'black',
  },
  closeModalButton: {
    position: 'absolute', // Absolute position
    top: 2,
    left: 1,
    padding: 10,
},
});

export default CommunityScreen;
