import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native';

const ArticleScreen = () => {
    const webViewRef = useRef(null);
    const [canGoBack, setCanGoBack] = useState(false);

    return (
        <>
            <WebView 
                ref={webViewRef}
                source={{ uri: 'https://hbr.org/2022/01/the-myth-of-sustainable-fashion' }}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                }}
            />
            <Button 
                title="Like"
                onPress={() => {
                    // TODO: Add article like functionality
                }}
                disabled={!canGoBack}
            />
        </>
    );
};

export default ArticleScreen;
