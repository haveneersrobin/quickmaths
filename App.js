import { Font } from 'expo';
import React from 'react';
import {StackNavigator, Easing} from 'react-navigation';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Menu from './screens/Menu';
import PlayingField from './screens/PlayingField';

const Navigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Menu: {
    screen: Menu
  },
  Field: {
    screen: PlayingField
  }
}, {headerMode: 'null'});

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };
  async componentDidMount () {
    await Font.loadAsync({
      'lovelo': require('./assets/fonts/Lovelo-Black.ttf'),
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