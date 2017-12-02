import _ from 'lodash';
import Expo from 'expo';
import React from 'react';
import * as firebase from 'firebase';
import Emoji from '../custom_modules/react-native-emoji/index';
import * as version from 'android-versions';
import styled from 'styled-components/native';
import ImgButton from '../components/ImageButton';

import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Text, View, Image, Button, Alert, Platform, TouchableHighlight} from 'react-native';
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
    width: ${() => Number(responsiveWidth(60))};
    height: ${() => Number(responsiveWidth(60))};
    margin-top: ${() => Number(responsiveWidth(50))};
`;

const LogoContainer = styled.View`
    flex: 2;
    align-items: center;
`;

const ButtonContainer = styled.View`
    flex: 1;
    align-items: center;
`;

const WhyText = styled.Text`
    margin-top: ${() => Number(responsiveHeight(6))};
    font-family: 'roboto';
    font-size: ${() =>responsiveFontSize(1.5)};
    color: #2a435c;
`;

const InnerText = styled.Text`
    padding-top: 10px;
    font-family: 'roboto';
    font-size: ${() =>responsiveFontSize(2)};
`;

const TextContainer = styled.View`
    padding: 20px;
    padding-top: 0px;
`;

const BoldText = styled.Text`
    font-family: 'roboto-bold';
`;




export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.showDialogOnPress = this.showDialogOnPress.bind(this);
    }

    _handleFacebookLogin = async () => {
        const { navigate } = this.props.navigation;
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('388911471560747', {
            permissions: ['public_profile'],
            });
        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            // Sign in with credential from the Facebook user.
            firebase.auth().signInWithCredential(credential).catch((error) => {
                Alert.alert(
                    'Firebase Error',
                    'Er is iets misgegaan bij Firebase.',
                    [
                        {text: 'Ok', onPress: (() => navigate('Menu'))},
                    ]
                  )
            });
            const user_id = firebase.auth().currentUser.uid;
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=age_range,gender,name`);
            const data = await response.json();
            firebase.database().ref('users/' + user_id + '/info').set({
                full_name: data.name,
                gender: data.gender,
                age: data.age_range.min,
                fb_app_id: data.id,
                device_info: {
                    name: Expo.Constants.deviceName,
                    year_class: Expo.Constants.deviceYearClass,
                    os: Platform.OS,
                    version : Platform.OS === "android" ? version.get(Platform.Version) : "ios"
                }
              });
            navigate('Tutorial', { uid : firebase.auth().currentUser.uid, gametype: _.random(0, 1) });
        }

        
    }
    showDialogOnPress() {
        this.popupDialog.show();
    }

      

    render() { 
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
        });

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
                        <ImgButton margin={0} homeButton={true} onPress={this._handleFacebookLogin} image={require('../assets/buttons/enter.png')}/>
                        <TouchableHighlight activeOpacity={0} onPress={this.showDialogOnPress}>
                            <WhyText>
                                Waarom moet ik inloggen ?
                            </WhyText>
                        </TouchableHighlight>
                    </ButtonContainer>
                </Overlay>
                <PopupDialog
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    width={Number(responsiveWidth(80))}
                    height={Number(responsiveHeight(65))}
                    dialogAnimation={slideAnimation}
                    cont
                    dialogTitle={<DialogTitle title="Waarom moet ik inloggen?" />}
                    >
                    <View>
                        <TextContainer>
                            <InnerText>Dit is een app gemaakt voor een universitair opleidingsonderdeel.</InnerText>
                            <InnerText>We gebruiken je Facebook-account enkel om analytische gegevens aan te kopppelen. <BoldText>Niets</BoldText> van je persoonlijke gegevens wordt opgeslagen.</InnerText>
                            <InnerText>Op geen enkel moment kunnen wij persoonlijke Facebook-data van jou raadplegen.</InnerText>
                            <InnerText> Je kan ook verder gaan zonder inloggen, maar dan krijgen we jou speel-data niet toegestuurd, waardoor we de app niet kunnen verbeteren <Emoji name="cry"/></InnerText>
                        </TextContainer>
                    </View>
                    <DialogButton
                        buttonStyle={[{backgroundColor:'#2a435c'}, {borderRadius:10,}]}
                        align="center"
                        textStyle={[{fontSize: 20}, {color:'white'}]}
                        disabled={false}
                        text="Ok! Ik log me in!"
                        onPress={() => {
                            this.popupDialog.dismiss();
                        }}
                        key="button-2"
                    />
                    <DialogButton
                            align="center"
                            textStyle={{fontSize: 10}}
                            disabled={false}
                            text="Doorgaan zonder inloggen"
                            onPress={() => navigate('Tutorial', { uid : firebase.auth().currentUser.uid, gametype: _.random(0, 1) })} 
                            key="button-1"
                        />
                </PopupDialog>
            </Container>
        );
      }
    }

    