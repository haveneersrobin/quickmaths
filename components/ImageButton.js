import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ImageBox = styled.View `
    padding-bottom:2px;
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    backgroundColor: rgba(0,0,0,0);
`;

export default class ImgButton extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image source={this.props.img}>
                    <ImageBox>
                        <Text style={styles.shadowedText}>{this.props.text}</Text>
                    </ImageBox>
                </Image>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    shadowedText: {
        textShadowColor:'#34495e',
        color: '#2c3e50',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius : 4,
        fontSize:30,
        fontFamily:'lovelo',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)'
    }
    
});
