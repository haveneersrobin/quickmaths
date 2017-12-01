import React from 'react';
import BigButton from '../components/BigButton';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Audio } from 'expo';


const BackgroundContainer = styled.View`
  position: absolute;
`;

const Overlay = styled.View`
  flex:1;
  flex-direction: column;
`;

const Container = styled.View`
  flex: 1;
  flex-direction:column;
  align-items: center;
`;

const BackdropImage = styled.Image`
  flex-direction: column;
  opacity: 0.5;
`;

const Logo = styled.Image`
  backgroundColor: transparent;
  align-items: center;
  width: ${() => Number(responsiveWidth(40))};
  height: ${() => Number(responsiveHeight(40))};
  margin-top: ${() => Number(responsiveHeight(7))};
`;

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
  margin-top: ${() => Number(responsiveHeight(5))};
`;

export default class Menu extends React.Component {
  static defaultProps = {
    level: 1,
    score: 0,
  };

  constructor(props) {
    super(props);
  }
  
  render() { 
    const { navigate } = this.props.navigation;
    return (
        <Container>
            <BackgroundContainer>
                <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
            </BackgroundContainer>
            <Overlay>
                <LogoContainer>
                    <Logo resizeMode = 'contain' source = {require('../assets/img/logo.png')} />
                </LogoContainer>
                <ButtonContainer>
                    <ImgButton margin={Number(responsiveHeight(2))} onPress={() => navigate('Question', {
                      level : this.props.level,
                      score: this.props.score,
                      uid: this.props.navigation.state.params.uid,
                      })} 
                      image={require('../assets/buttons/play.png')}/>
                    <ImgButton margin={Number(responsiveHeight(2))} image={require('../assets/buttons/highscores.png')}/>
                    <View style={[{flex:2}, {flexDirection:'row'},{justifyContent:'space-around'}, {alignItems:'center'}]}>
                      <ImgButton bottomButton={true} margin={Number(responsiveHeight(1))} onPress={() => navigate('Profile', 
                          {user:'Sander, Mathias, Robin en Laurens',
                           playerstatus:'Speed Master',
                           img:'../assets/img/icon.png'
                          })}  fontSize={30} image={require('../assets/buttons/profile.png')}/>
                      <ImgButton bottomButton={true} margin={Number(responsiveHeight(1))} image={require('../assets/buttons/settings.png')}/>
                    </View>
                </ButtonContainer>
            </Overlay>
        </Container>
    );
  }
}




{/*export default class Menu extends React.Component {

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
            <View style={styles.buttonwrap}>
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
              onPress={() => navigate('Profile', 
                          {user:'Sander, Mathias, Robin en Laurens',
                           playerstatus:'Speed Junkie',
                           img:'../assets/img/icon.png'
                          })} 
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonWrap: {
    flex: 1,
  },

  bottomButton: {
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: (Dimensions.get('window').width / 2) - 80,
    height: 80,
    margin: 10
  },

  bottom: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonWrap1: {
    flex:1,
    top: 80
  },

  highScoresButton: {
    marginTop: 30,
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: (Dimensions.get('window').width / 2) - 30,
    height: (Dimensions.get('window').height / 7),
  },

  playButton: {
    borderColor: '#34495e',
    borderRadius: 10,
    borderWidth: 3,
    width: (Dimensions.get('window').width / 2) - 30,
    height: (Dimensions.get('window').height / 7),
  },

  container: {
    flex: 1
  },
  top: {
    flex: 2,
    alignItems: 'center'
  },
  textLarge: {
    fontFamily:'lovelo',
    textShadowColor:'#34495e',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius : 8,
    fontSize: 60,
    fontWeight: 'bold',
    color: '#34495e',
    position: 'absolute',
    bottom: 0
  }
});*/}
