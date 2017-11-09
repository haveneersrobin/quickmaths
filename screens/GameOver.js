import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';

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
    height: 360;
    margin-top: 130;
`;

const LogoContainer = styled.View`
    flex: 2;
    align-items: center;
`;

const ButtonContainer = styled.View`
    flex: 1;
    align-items: center;
`;



export default class GameOver extends React.Component {
      render() { 
        console.log(this.props.navigation);
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    <LogoContainer>
                        <Logo style={{width:200, height:200}} resizeMode = 'contain' source = {require('../assets/img/game-over.png')} />
                    </LogoContainer>
                    <View style={[{flex:2}, {flexDirection:'row'},{justifyContent:'space-around'}]}>
                      <ImgButton margin={20} onPress={() => navigate('Menu')}  fontSize={30} image={require('../assets/buttons/play.png')}/>
                      <ImgButton margin={20} fontSize={30} image={require('../assets/buttons/settings.png')}/>
                    </View>
                </Overlay>
            </Container>
        );
      }
    }

    