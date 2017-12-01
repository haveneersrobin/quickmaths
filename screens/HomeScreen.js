import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import Expo from 'expo';

import * as firebase from 'firebase';

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




export default class HomeScreen extends React.Component {
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
                fb_app_id: data.id
              });
            console.log("navigating");
            //navigate('Tutorial', { uid : firebase.auth().currentUser.uid });
        }
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
                        <Button
                            onPress={this._handleFacebookLogin}
                            title="Login met Facebook"
                        />
                        <Button
                            onPress={() => Alert.alert(
                                'Inloggen',
                                'Dit is een app gemaakt voor een universitair opleidingsonderdeel. \n \n We gebruiken je Facebook-account enkel om analytische gegevens op te slaan voor de verdere ontwikkeling van deze app. Niets van je persoonlijke gegevens wordt opgeslagen, enkel analytische data gekoppeld aan een code die gelinkt is met je Facebook-account.\n \n Op geen enkel moment kunnen wij Facebook-data van jou raadplegen. Je kan ook verder gaan zonder inloggen, maar dan krijgen we jou speel-data niet toegestuurd, waardoor we de app niet kunnen verbeteren :(',
                                [
                                    {text: 'Doorgaan zonder inloggen', onPress: (() => navigate('Tutorial'))},
                                    {text: 'Ok, ik begrijp het !', onPress: (() => console.log("akkoord"))},
                                ]
                              )}
                            title="?"
                        />
                    </ButtonContainer>
                </Overlay>
            </Container>
        );
      }
    }

    