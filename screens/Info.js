import React from 'react';
import styled from 'styled-components/native';
import ImgButton from '../components/ImageButton';

import { Audio } from 'expo';
import { View } from 'react-native';
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
    width: ${() => Number(responsiveWidth(40))};
    height: ${() => Number(responsiveHeight(40))};
    margin-top: ${() => Number(responsiveHeight(7))};
`;


const AcaLogo = styled.Image`
    backgroundColor: transparent;
    align-items: center;
    width: ${() => Number(responsiveWidth(25))};
    height: ${() => Number(responsiveHeight(25))};
    margin-top: ${() => Number(responsiveHeight(3))};
`;

const LogoContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: ${() => Number(responsiveHeight(5))};
`;

const InfoText = styled.Text`
    margin-top: 5px;
    text-align: center;
    font-family:'roboto';
    font-size: ${() => Number(responsiveFontSize(2))};
    color: #2a435c;
`;

const TextContainer = styled.View`
    padding: 15px;
`;

export default class Info extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    <LogoContainer>
                        <Logo resizeMode = 'contain' source = {require('../assets/img/logo.png')} />
                    </LogoContainer>
                    <TextContainer>
                        <InfoText> Deze app is gemaakt door Laurens Cleemput, Sander Cleymans, Mathias Dekempeneer en Robin Haveneers voor het vak Fundamenten van Mens-machine interactie (B-KUL-G0Q55A) aan de KU Leuven. </InfoText>
                        <InfoText>We verzamelen in onze app gebruikersstatistieken gekoppeld aan je Facebook-account. Deze data wordt niet verdeeld aan derden is niet publiek toegankelijk maar wordt enkel gebruikt voor analytische en statistische doeleinden.</InfoText>
                        <InfoText>Voor vragen of opmerkingen kan je ons bereiken op [naam].[voornaam]@student.kuleuven.be.</InfoText>
                        <InfoText>
                            Achtergrondmuziek: "Wandering" door "Syrapt0r".{"\n"}
                            Luister hier:{"\n"}https://www.newgrounds.com/audio/listen/766948{"\n"}
                            Licensed under CC BY-NC-SA 3.0{"\n"}
                        </InfoText>
                    </TextContainer>
                    <View style={[{flex: 1}, {alignItems:'center'}, {justifyContent: 'center'}]}>
                        <ImgButton onPress={() => goBack()} isBack={true} margin={0} image={require('../assets/buttons/back.png')}/>
                    </View>
                    <LogoContainer>
                        <AcaLogo resizeMode = 'contain' source = {require('../assets/img/kul.png')} />
                        <AcaLogo resizeMode = 'contain' source = {require('../assets/img/augment.png')} />
                    </LogoContainer>
                </Overlay>
            </Container>
        );
    }

}