import React from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';

const SpecialImg = styled(Image)`
    resize-mode:contain;
    justify-content:center;
    ${props => props.back ? "width: 50; height:50" : ""}
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
            return 2;
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
                        back={this.props.isBack}
                        source={this.props.image}>
                    </SpecialImg>
            </TouchableOpacity>
        );
    }
}
