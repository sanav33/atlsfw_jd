import React, { useState, useEffect } from "react";
import { View, Image, FlatList } from "react-native";
import Article from "../components/Article";
import axios from "axios";
import MY_IP_ADDRESS from "../environment_variables.mjs";
import MasonryList from "@react-native-seoul/masonry-list";

const SavedArticles = () => {
  const [isSavePressed, setSavePressed] = useState(false);

  // possibly import navigation here if needed
  //   const navigateToPage = (pageName) => {
  //     setCurrentScreen(pageName);
  //   };

  const handleSavePress = () => {
    // Toggle the state when the Save button is pressed
    setSavePressed(!isSavePressed);
  };

  const [articleData, setArticleData] = useState();

  // function for fetching article data with selected tags
  const fetchArticleData = async () => {
    try {
      const response = await axios.get(
        "http://" + MY_IP_ADDRESS + ":5050/posts"
        // edit this later to access saved posts data
      );
      setArticleData(response.data);
    } catch (error) {
      console.error("Error during data fetch:", error.message);
    }
  };

  // Fetch article data when page is initialized
  useEffect(() => {
    fetchArticleData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Main Content */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          numColumns={2}
          data={articleData}
          keyExtractor={(item) => item["_id"]}
          renderItem={({ item, index }) => (
            <Article
              article={{
                title: item["article_title"],
                image: item["article_preview_image"],
                author: item["author_name"],
                likes: item["like_count"],
                article_id: item["_id"],
                article_link: item["article_link"],
              }}
            ></Article>
          )}
        />
      </View>

      {/* Organization Logo */}
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <Image
          source={require("./ATLSFWlogo.jpg")}
          style={{ width: 150, height: 50, resizeMode: "contain" }}
        />
      </View>
    </View>
  );
};

export default SavedArticles;
