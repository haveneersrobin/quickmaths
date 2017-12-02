import React from 'react';
import styled from 'styled-components/native';
import ImgButton from '../components/ImageButton';

import { Audio } from 'expo';
import { View } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


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
                      gametype: this.props.navigation.state.params.gametype,
                      })} 
                      image={require('../assets/buttons/play.png')}/>
                    <ImgButton margin={Number(responsiveHeight(2))} image={require('../assets/buttons/highscores.png')}/>
                    <View style={[{flex:2}, {flexDirection:'row'},{justifyContent:'space-around'}, {alignItems:'center'}]}>
                      <ImgButton bottomButton={true} onPress={() => navigate('Info')} margin={Number(responsiveHeight(1))} image={require('../assets/buttons/settings.png')}/>
                    </View>
                </ButtonContainer>
            </Overlay>
        </Container>
    );
  }
}
