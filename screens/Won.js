import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, Alert} from 'react-native';
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
    flex: 1;
    align-items: center;
`;

const WinText = styled.Text`
    font-size: 40;
    color: #2A435C;
    font-family: 'proxima';
    width: 50%;
    text-align: center;
`;



export default class Won extends React.Component {
      render() { 
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    <LogoContainer>
                        <Logo style={{width:250, height:250}} resizeMode = 'contain' source = {require('../assets/img/won.gif')} />
                    </LogoContainer>
                    <View style={[{flex:1}, {alignItems: 'center'},{flexDirection:'column'},{justifyContent:'space-around'},{marginTop:-0}]}>
                        <WinText style={[{flex:1}, {flexDirection:'row'},{justifyContent:'center'}]}>
                            <Text> Proficiat, je hebt gewonnen!</Text>
                        </WinText>
                        <View style={[{flex:2}, {flexDirection:'row'},{justifyContent:'center'}]}>
                            <ImgButton margin={10} onPress={
                                () => Alert.alert(
                                    'Ben je zeker ?',
                                    'In deze versie van het spel gaat je voortgang verloren als je terug naar het hoofdscherm gaat.',
                                    [
                                        {text: 'Ja, ik ben zeker!', onPress: (() => navigate('Home'))},
                                        {text: 'Annuleer', onPress: () => console.log('Annuleren')},
                                    ]
                                  )
                                } fontSize={30} image={require('../assets/buttons/home-small.png')}/>
                            <ImgButton margin={10} image={require('../assets/buttons/next.png')}/>
                        </View>
                    </View>
                </Overlay>
            </Container>
        );
      }
    }

    