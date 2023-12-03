import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import MY_IP_ADDRESS from "../environment_variables.mjs";
import { useSelector } from "react-redux";

const ArticleForm = () => {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleImage, setArticleImage] = useState('');
  const [articleLink, setArticleLink] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorPfpLink, setAuthorPfpLink] = useState('');
  const [tags, setTags] = useState('');
  const userInfo = useSelector((store) => store.userInfo.userInfo);

  const handleSubmit = async () => {
    try {
      const url = `http://${MY_IP_ADDRESS}:5050/posts/create`;
      const payload = {
        article_title: articleTitle,
        article_preview_image: articleImage,
        article_link: articleLink,
        author_id: userInfo["_id"],
        author_name: userInfo["first_name"] + " " + userInfo["last_name"],
        author_pfp_link: authorPfpLink,
        tags: tags.split(',').map(tag => tag.trim()),
      };
      console.log(userInfo);
      console.log('Payload:', payload);
      const response = await axios.post(url, payload);
      console.log(response.data.message);

      if (response.data.success) {
        Alert.alert('Article Created Successfully');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the article');
    }
  };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Article Title" onChangeText={setArticleTitle} value={articleTitle} onFocus={() => Alert.alert("Please complete filling out your vendor information prior to creating an article!")}/>
                <TextInput style={styles.input} placeholder="Article Link" onChangeText={setArticleLink} value={articleLink}/>
                <TextInput style={styles.input} placeholder="Article Preview Image" onChangeText={setArticleImage} value={articleImage}/>
                <TextInput style={styles.input} placeholder="Author Profile Picture Link" onChangeText={setAuthorPfpLink} value={authorPfpLink}/>
                <TextInput style={styles.input} placeholder="Tags" onChangeText={setTags} value={tags}/>
                <Button title="Submit Article" onPress={handleSubmit}/>
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

export default ArticleForm;