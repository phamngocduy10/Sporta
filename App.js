/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { LoginRouter } from './src/LoginRouter/LoginRouter';
import Login from './src/Login/Login';


const App = () => {

  return (
    <NavigationContainer>
      <LoginRouter />
    </NavigationContainer>
    // <View>
    //   <Login />
    // </View>
  );
};

export default App;
