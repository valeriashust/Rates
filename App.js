import {YellowBox,} from 'react-native';
import SearchPage from './SearchPage';
import React from 'react'
import {createStackNavigator,} from 'react-navigation';
import SearchResults from './SearchResults';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const App = createStackNavigator({
    Home: {screen: SearchPage},
    Results: {screen: SearchResults},
});
export default App;


