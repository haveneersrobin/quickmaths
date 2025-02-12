import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-direction: row;
`;

const Bar = styled.View`
    height: 10px;
    flex: ${ props => props.size };
    background-color: ${ props => props.color };
`;

export default class BottomTimer extends React.Component { 
    static defaultProps = { filled: 1, total: 3 };
    render() {
        const { filled, total } = this.props;
        return (
            <Container>
                <Bar color="#ffca3b" size={total - filled} />
                <Bar color="#00213d" size={filled} />
            </Container>
        );
    }
};