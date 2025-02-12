import React from 'react';
import styled from 'styled-components/native';
import ImgButton from '../components/ImageButton';

import { Audio } from 'expo';
import { Text, View, Image, Alert} from 'react-native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

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

    async playSound() {
        const source = require('../assets/sounds/Correct_1.wav');
        try {
          await Audio.setIsEnabledAsync(true);
          const sound = new Audio.Sound();
          await sound.loadAsync(source);
          await sound.playAsync(); 
        } catch(error) {
          console.error(error);
        }
    }

    componentDidMount() {
        this.playSound();
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
                                        {text: 'Ja, ik ben zeker!', onPress: (() => navigate('Menu', { uid:this.props.navigation.state.params.uid, gametype: this.props.navigation.state.params.gametype }))},
                                        {text: 'Annuleer', onPress: () => console.log('Annuleren')},
                                    ]
                                  )
                                } fontSize={30}  image={require('../assets/buttons/home-small.png')}/>
                            <ImgButton bottomButton={true} margin={Number(responsiveHeight(2))} onPress={(() => navigate('Question', {level:this.props.navigation.state.params.level, score:this.props.navigation.state.params.score, uid:this.props.navigation.state.params.uid, gametype: this.props.navigation.state.params.gametype }))} image={require('../assets/buttons/next.png')}/>
                        </View>
                    </View>
                </Overlay>
            </Container>
        );
      }
    }

    