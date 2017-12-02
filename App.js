import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import {StackNavigator, Easing} from 'react-navigation';
import { Font } from 'expo';
import React from 'react';

import ProfileScreen from './screens/ProfileScreen';
import PlayingField from './screens/PlayingField';
import HomeScreen from './screens/HomeScreen';
import GameOver from './screens/GameOver';
import Question from './screens/Question';
import Tutorial from './screens/Tutorial';
import Menu from './screens/Menu';
import Won from './screens/Won';
import Info from './screens/Info';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA30QcshdqvtOFZiUghZnDTuUHCPPwOTic",
  authDomain: "quickmaths-baf21.firebaseapp.com",
  databaseURL: "https://quickmaths-baf21.firebaseio.com",
  storageBucket: "quickmaths-baf21.appspot.com"
};

firebase.initializeApp(firebaseConfig);

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Menu: {
    screen: Menu
  },
  Field: {
    screen: PlayingField
  },
  Profile: {
    screen: ProfileScreen
  },
  GameOver: {
    screen: GameOver
  },
  Question: {
    screen: Question
  },
  Won: {
    screen: Won
  },
  Tutorial: {
    screen: Tutorial
  },
  Info: {
    screen: Info
  }
}, {headerMode: 'null'});

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount () {
    await Font.loadAsync({
      'lovelo': require('./assets/fonts/Lovelo-Black.ttf'),
      'roboto-bold': require('./assets/fonts/RobotoCondensed.ttf'),
      'roboto': require('./assets/fonts/Roboto-Light.ttf'),
      'proxima': require('./assets/fonts/Proxima.ttf'),
      'Arial': require('./assets/fonts/Arial.ttf'),
    })
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Navigator screenProps={this.state.fontLoaded}/>
      </View>
      ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});