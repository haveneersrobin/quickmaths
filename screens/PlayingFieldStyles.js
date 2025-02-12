import styled from 'styled-components/native';

import { Text } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export const QuestionText = styled.Text`
    font-family: 'roboto';
    text-align:center;
    font-size: ${() => Number(responsiveFontSize(2.3))};
    color: white;
`;

export const RestText = styled.Text`
    padding-bottom:${() => Number(responsiveFontSize(0.1))}px;
    font-family: 'roboto';
    text-align:center;
    font-size: ${() => Number(responsiveFontSize(1.3))};
    color: white;
    border: 2px solid #77C4E5;
    border-top-width: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
`;

export const Container = styled.View`
    flex: 1;
`;

export const InfoText = styled.View`
    background-color:transparent;
    flex: 1;
    justify-content: center;
    align-items: flex-end;
    padding: 3px;
    margin: 8px;
`;

export const InfoContainer = styled.View`
    flex: 3;
`;

export const QuestionContainer = styled.View`
    border-radius: 3;
    background-color : #566e89;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex: 5;
    margin:8px;
`;

export const Header = styled.View`
    background-color: #214868;
    flex: 2;
    flex-direction: row;
`;

export const Field = styled.View`
    flex:10;
`;
