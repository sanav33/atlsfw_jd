import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Article from '../components/Article';

const ArticleContent = ({route}) => {

	const webViewRef = useRef(null);
	const {link} = route.params;

	return (
	<>
		<WebView 
			source = {{ uri: link }}
			style = {{ flex: 1 }}
		/>

	</>

	);

};

export default ArticleContent;