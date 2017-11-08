import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, BackHandler} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

const BackgroundContainer = styled.View`
    position: absolute;
`;

const Overlay = styled.View`
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const Container = styled.View`
    flex: 1;
    flex-direction:column;
    align-items: center;
    justify-content: center;
`;

const BackdropImage = styled.Image`
    flex-direction: column;
    opacity: 0.5;
`;

const LargeText = styled.Text`
    font-family: 'proxima';
    font-size: 70px;
    text-align: center;
`;

const Timer = styled.Text`
    margin-top: 50px;
    border: 1px solid #A1C1B9;
    font-family: 'proxima';
    font-size: 50px;
    text-align: center;
    color:#A1C1B9;
`;


export default class Question extends React.Component {
    static defaultProps = {
        question: "Welk getal is deelbaar door 3?",
        interval: 5000,
    };

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = {timer : this.props.interval/1000};
    }

    goToQuestion() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                NavigationActions.navigate({ routeName: 'Field' }),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleBackButton() {
        console.log("back button pressed");
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const timer = setTimeout(() => this.goToQuestion(), this.props.interval);
        setInterval(() => {
            this.setState(previousState => {
              return { timer: previousState.timer - 1 };
            });
          }, 1000);
        
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

      render() { 
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    <LargeText>
                        {this.props.question}
                    </LargeText>
                    <Timer>
                        Spel start in: {this.state.timer}
                    </Timer>
                </Overlay>
            </Container>
        );
      }
    }

    