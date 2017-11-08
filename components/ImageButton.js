import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';



const SpecialImg = styled(Image)`
    resize-mode:contain;
    justify-content:center;
`;


export default class ImgButton extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
                <TouchableOpacity onPress={this.props.onPress}>
                        <SpecialImg
                        margin={this.props.margin}
                        source={this.props.image}>
                    </SpecialImg>
            </TouchableOpacity>
        );
    }
}



function textStyle(fontSize) {
    return {
        textShadowColor:'#34495e',
        color: '#2c3e50',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius : 4,
        fontSize:fontSize,
        fontFamily:'lovelo',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    }
};