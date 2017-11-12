import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';



const SpecialImg = styled(Image)`
    resize-mode:contain;
    justify-content:center;
    aspect-ratio: ${props => { 
        if(!props.homeButton) {
            if(props.bottomButton) {
                return 0.7;
            }
            else {
                return 1.5;
            }
        }
        else {
            return 3;
        }
    }};
`;


export default class ImgButton extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
                <TouchableOpacity onPress={this.props.onPress}>
                        <SpecialImg
                        homeButton={this.props.homeButton}
                        bottomButton={this.props.bottomButton}
                        margin={this.props.margin}
                        source={this.props.image}>
                    </SpecialImg>
            </TouchableOpacity>
        );
    }
}
