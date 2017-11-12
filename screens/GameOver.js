import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image} from 'react-native';
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
    margin-top: ${() => Number(responsiveHeight(15))}px;
`;

const LogoContainer = styled.View`
    flex: 1;
    align-items: center;
`;



export default class GameOver extends React.Component {
      render() { 
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    <LogoContainer>
                        <Logo resizeMode = 'contain' source = {require('../assets/img/game-over.png')} />
                    </LogoContainer>
                    <View style={[{flex:1}, {flexDirection:'column'},{justifyContent:'space-around'}]}>
                        <View style={[{flex:1}, {flexDirection:'row'},{justifyContent:'center'}, {marginTop:30}]}>
                            <ImgButton bottomButton={true} margin={Number(responsiveHeight(2))} onPress={() => navigate('Menu')} image={require('../assets/buttons/home-small.png')}/>
                            <ImgButton bottomButton={true} margin={Number(responsiveHeight(2))} onPress={(() => navigate('Question', {level: this.props.navigation.state.params.level}))}  image={require('../assets/buttons/replay.png')}/>
                        </View>
                    </View>
                </Overlay>
            </Container>
        );
      }
    }

    