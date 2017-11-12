import React from 'react';
import Swiper from 'react-native-swiper';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, BackHandler, Animated} from 'react-native';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


const Slide = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #E1E2E1;
    border: 1px solid #214868;
`;

const SlideImage = styled.Image`
    flex:1;
`;


const Title = styled.Text`
    border: 2px solid #77C4E5;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
    padding-bottom: ${() => parseInt(responsiveHeight(1),10)}px;
    margin-top: -${() => parseInt(responsiveHeight(8),10)}px;
    margin-bottom: ${() => parseInt(responsiveHeight(3),10)}px;
    font-size: ${() => Number(responsiveFontSize(4))};
    text-align: center;
    font-family: 'roboto';
    color: #214868;
`;

const BeginText = styled.Text`
    margin-top: ${() => parseInt(responsiveHeight(2),10)}px;
    margin-bottom: -${() => parseInt(responsiveHeight(4),10)}px;
    font-size: ${() => Number(responsiveFontSize(3))};
    text-align: right;
    font-family: 'roboto';
    color: #214868;
    
`;


export default class Tutorial extends React.Component {
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={[{flex:1}]} margin={40} marginTop={80}>
                <Title>
                    Hoe speel je het spel?
                </Title>
                <Swiper showsButtons={true}>
                    <Slide>
                        <SlideImage resizeMode='contain' source={require('../assets/img/tut1.png')}/>
                    </Slide>
                    <Slide>
                        <SlideImage resizeMode='contain' source={require('../assets/img/tut2.png')}/>
                    </Slide>
                    <Slide>
                        <SlideImage resizeMode='contain' source={require('../assets/img/tut3.png')}/>
                    </Slide>
                    <Slide>
                        <SlideImage resizeMode='contain' source={require('../assets/img/tut4.png')}/>
                    </Slide>
                </Swiper>
                <BeginText onPress={() => navigate('Menu')}>
                    Begin >
                </BeginText>
            </View>
        )
      }
}
