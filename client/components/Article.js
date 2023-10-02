import {View, Image, Text, StyleSheet, Pressable} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {useState, useEffect} from "react";

const Article = (props) => {
	const { image, title } = props.article;

	const [ratio, setRatio] = useState(1);

	const LikeButton = () => {};

	useEffect(() => {
		if (image) {
			Image.getSize(image, (width, height) => setRatio(width / height));
		}
	}, [image])

	return (
		<View style={styles.article}>
			<View>
				<Image
					source={{
						uri:image,
					}}
					style={[styles.image, {aspectRatio: ratio}]}
				/>
				<Pressable onPress={LikeButton} style={styles.likeButton}>
      			<AntDesign
        			name={"hearto"}
        			size={20}
        			color={"black"}
      			/>
    			</Pressable>
				<Text style={styles.title}>{title}</Text>
			</View>
		</View>

	); 
};

const styles = StyleSheet.create({
	article: {
		width: "100%",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		margin: 10,
	},
	image: {
		width: "100%",
		borderRadius: 25,
	},
	likeButton: {
		backgroundColor: "#D3CFD4",
		position: "absolute",
		bottom: 10,
		right: 10,
		padding: 5,
		borderRadius: 50,
	},
});

export default Article
