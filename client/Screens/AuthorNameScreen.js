// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const AuthorNameScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Author's Name</Text>
//       <Text style={styles.bio}>
//         Hello! This is a brief bio about (Author's Name).
//         {/* Add your bio content here */}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 16,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
// });

// export default AuthorNameScreen;











// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import axios from 'axios';
// import MY_IP_ADDRESS from "../environment_variables.mjs";

// const AuthorNameScreen = ({ route }) => {
//   const [authorInfo, setAuthorInfo] = useState(null);

//   useEffect(() => {
//     // Fetch author's information when the component mounts
//     const fetchAuthorInfo = async () => {
//       try {
//         const vendorId = route.params.vendorId; // Assuming vendorId is passed from the route
//         const response = await axios.get(`http://${MY_IP_ADDRESS}:5050/discover/${vendorId}`);
        
//         if (response.status === 200) {
//           setAuthorInfo(response.data);
//         } else {
//           console.error('Failed to fetch author information');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAuthorInfo();
//   }, []);

//   if (!authorInfo) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{`${authorInfo.first_name} ${authorInfo.last_name}`}</Text>
//       <Text style={styles.bio}>
//         {`Email: ${authorInfo.email}`}
//         {'\n'}
//         {`Birth Month: ${authorInfo.birth_month}`}
//         {'\n'}
//         {`Phone: ${authorInfo.phone}`}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   bio: {
//     fontSize: 16,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
// });

// export default AuthorNameScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import MY_IP_ADDRESS from "../environment_variables.mjs";
import { useSelector } from "react-redux";

const AuthorNameScreen = ({ route }) => {
  const userInfo = useSelector((store) => store.userInfo.userInfo);
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const vendorId = userInfo["_id"];
        console.log(vendorId);
        const response = await axios.get(`http://${MY_IP_ADDRESS}:5050/discover/` + vendorId);

        if (response.status === 200) {
          setAuthorInfo(response.data);
        } else {
          console.error('Failed to fetch author information');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorInfo();
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${userInfo?.first_name} ${userInfo?.last_name}`}</Text>
      <Text style={styles.bio}>
        {/* Display other information from the fetched authorInfo */}
        {/* Modify this as per your actual data structure */}
        {`Brand Name: ${authorInfo?.brand_name}`}
        {'\n'}
        {`Shop Now Link: ${authorInfo?.shop_now_link}`}
        {'\n'}
        {`Title: ${authorInfo?.title}`}
        {'\n'}
        {`Intro: ${authorInfo?.intro}`}
        {/* Add your bio content here */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AuthorNameScreen;