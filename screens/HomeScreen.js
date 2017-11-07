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
    width: 360;
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



export default class HomeScreen extends React.Component {
      render() { 
        const resizeMode = 'center';
        const text = 'This is some text inlaid in an <Image />';
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
                        <ImgButton onPress={() =>navigate('Menu')} fontSize={30} text={"Enter"} image={require('../assets/button/grey_button14.png')}/>
                    </ButtonContainer>
                </Overlay>
            </Container>
        );
      }
    }

    