import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { StackNavigator, Easing } from 'react-navigation';
import { Font, Asset, AppLoading } from 'expo';
import React from 'react';

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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false
  };
  async _loadAssetsAsync () {
    const imageAssets = cacheImages([
      require('./assets/img/augment.png'),
      require('./assets/img/background.jpg'),
      require('./assets/img/game-over.png'),
      require('./assets/img/icon.png'),
      require('./assets/img/icon_ios.png')
      require('./assets/img/img.png'),
      require('./assets/img/kul.png'),
      require('./assets/img/logo.png'),
      require('./assets/img/splash.png'),
      require('./assets/img/tuto1.png'),
      require('./assets/img/tuto2.png'),
      require('./assets/img/tuto3.png'),
      require('./assets/img/tuto4.png'),
      require('./assets/img/won.gif')
    ]);
    const fontAssets = cacheFonts([
      {'lovelo': require('./assets/fonts/Lovelo-Black.ttf')},
      {'roboto-bold': require('./assets/fonts/RobotoCondensed.ttf')},
      {'roboto': require('./assets/fonts/Roboto-Light.ttf')},
      {'proxima': require('./assets/fonts/Proxima.ttf')},
    ]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Navigator screenProps={this.state.fontLoaded}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
