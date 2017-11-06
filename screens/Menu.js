import React from 'react';
import BigButton from '../components/BigButton';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default class Menu extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1
        }}>
          <View style={styles.top}>
            <Text style={styles.textLarge}>
              Quick Maths
            </Text>
          </View>
          <View style={styles.middle}>
            <View style={styles.buttonWrap1}>
              <BigButton
                onPress={() => navigate('Field')}
                style={styles.playButton}
                icon="play"
                size={80}
                color={"#34495e"}/>
              <BigButton
                style={styles.highScoresButton}
                icon="trophy"
                size={50}
                color={"#34495e"}/>
            </View>
          </View>
          <View style={styles.bottom}>
            <BigButton
              style={styles.bottomButton}
              icon="face-profile"
              size={40}
              color={"#34495e"}/>
            <BigButton
              style={styles.bottomButton}
              icon="settings"
              size={40}
              color={"#34495e"}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  middle: {
    flex: 3,
    alignItems: 'center'
  },

  bottomButton: {
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: (Dimensions.get('window').width / 2) - 30,
    height: 80,
    margin: 10
  },

  bottom: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonWrap1: {
    position: 'absolute',
    top: 40
  },

  highScoresButton: {
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: 200,
    height: 70
  },

  playButton: {
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: 200,
    height: 110
  },

  container: {
    flex: 1
  },
  top: {
    flex: 2,
    alignItems: 'center'
  },
  textLarge: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#34495e',
    position: 'absolute',
    bottom: 0
  }
});
