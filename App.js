import { Font } from 'expo';
import React from 'react';
import {StackNavigator, Easing} from 'react-navigation';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Menu from './screens/Menu';
import PlayingField from './screens/PlayingField';
import ProfileScreen from './screens/ProfileScreen';

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
  }
}, {headerMode: 'null'});

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount () {
    await Font.loadAsync({
      'lovelo': require('./assets/fonts/Lovelo-Black.ttf'),
      'roboto': require('./assets/fonts/Roboto-Light.ttf'),
    })
    console.log('font loaded!!')
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