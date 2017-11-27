import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, Alert} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
    height: ${() => Number(responsiveHeight(40))};
    margin-top: ${() => Number(responsiveHeight(10))}px;
`;

const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
`;

const WinText = styled.Text`
    font-size: ${() => responsiveFontSize(4)};
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
                        <Logo resizeMode = 'contain' source = {require('../assets/img/won.gif')} />
                    </LogoContainer>
                    <View style={[{flex:1}, {alignItems: 'center'},{flexDirection:'column'},{justifyContent:'space-around'},{marginTop:-0}]}>
                        <WinText style={[{flex:1}, {flexDirection:'row'},{justifyContent:'center'}]}>
                            <Text> Proficiat, level {this.props.navigation.state.params.level-1} voltooid !</Text>
                        </WinText>
                        <WinText style={[{flex:1}, {flexDirection:'row'},{justifyContent:'center'}]}>
                            <Text> Score: {this.props.navigation.state.params.score}</Text>
                        </WinText>
                        <View style={[{flex:2}, {flexDirection:'row'},{justifyContent:'center'}]}>
                            <ImgButton bottomButton={true} margin={Number(responsiveHeight(2))} onPress={
                                () => Alert.alert(
                                    'Ben je zeker ?',
                                    'In deze versie van het spel gaat je voortgang verloren als je terug naar het hoofdscherm gaat.',
                                    [
                                        {text: 'Ja, ik ben zeker!', onPress: (() => navigate('Menu'))},
                                        {text: 'Annuleer', onPress: () => console.log('Annuleren')},
                                    ]
                                  )
                                } fontSize={30}  image={require('../assets/buttons/home-small.png')}/>
                            <ImgButton bottomButton={true} margin={Number(responsiveHeight(2))} onPress={(() => navigate('Question', {level:this.props.navigation.state.params.level, score:this.props.navigation.state.params.score}))} image={require('../assets/buttons/next.png')}/>
                        </View>
                    </View>
                </Overlay>
            </Container>
        );
      }
    }

    