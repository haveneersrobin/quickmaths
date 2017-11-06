import React from 'react';
import { Image, TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const ImageBox = styled.View `
    padding-bottom:${props => props.padding};;
    justifyContent: center;
    backgroundColor: rgba(0,0,0,0);
`;

const SpecialImg = styled(Image)`
    overflow: visible;
    resize-mode:cover;
    margin-top:${props => props.marginTop};
    height:${props => props.height*props.scale};
    width:${props => props.width*props.scale};
`;

export default class ImgButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPressed: false
        }

        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
        this.getBtnImg = this.getBtnImg.bind(this);
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                <View>
                    <SpecialImg
                        width={this.props.widthlea} 
                        height={this.props.height}
                        scale={this.props.scale} 
                        marginTop={this.props.marginTop}
                        source={this.getBtnImg()}
                        isPressed={this.state.isPressed}>
                        <ImageBox padding={this.props.paddingBottom}>
                            <Text style={textStyle(this.props.fontSize)}>
                                {this.props.text}
                            </Text>
                        </ImageBox>
                    </SpecialImg>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    handlePressIn() {
        this.setState({
            isPressed: true
        });
    }

    handlePressOut() {
        this.setState({
            isPressed: false
        });
    }

    getBtnImg() {
        return (this.state.isPressed) ? this.props.pressedImg : this.props.normalImg;
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
