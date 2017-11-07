import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ImageBox = styled.View `
    backgroundColor: rgba(0,0,0,0);
    justify-content:center;
    align-items:center;
    height:100%;
    flex-grow:1;
    padding-bottom:${props => props.padding};
`;

const SpecialImg = styled(Image)`
    resize-mode:contain;
`;

const ExpandableView = styled.View`
    
`;
// const SpecialImg = styled(Image)`
// resize-mode:cover;
// margin-top:${props => props.marginTop};
// height:${props => props.height*props.scale*2};
// width:${props => props.width*props.scale*2};
// `;

export default class ImgButton extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                    <SpecialImg 
                    imgMarginTop={this.props.marginTop}
                    source={this.props.normalImg}>
                    <ImageBox padding={this.props.paddingBottom}>
                        <Text style={textStyle(this.props.fontSize)}>{this.props.text}</Text>
                    </ImageBox>
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
