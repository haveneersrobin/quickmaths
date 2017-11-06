import React from 'react';
import {StackNavigator, Easing} from 'react-navigation';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import Menu from './screens/Menu';
import PlayingField from './screens/PlayingField';
import { Font } from 'expo';

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
  componentDidMount() {
    Font.loadAsync({
      'lovelo-black': require('./assets/fonts/Lovelo-Black.otf')
    });
    Font.loadAsync({
    'lovelo-line-bold': require('./assets/fonts/Lovelo-Line-Bold.otf'),
    });
    Font.loadAsync({
    'lovelo-line': require('./assets/fonts/Lovelo-Line-Light.otf')
    });

  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Navigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});