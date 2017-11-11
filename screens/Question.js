import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, BackHandler, Animated} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';

const BackgroundContainer = styled.View`
    position: absolute;
`;

const Overlay = styled.View`
    margin-top:100px;
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
    padding: 10px;
`;

const Timer = styled.Text`
    margin-top: 30px;
    border: 1px solid #A1C1B9;
    font-family: 'proxima';
    font-size: 50px;
    text-align: center;
    color:#A1C1B9;
`;

const Logo = styled.Image`
    margin-top:40;
    backgroundColor: transparent;
    align-items: center;
    height: 360;
    width:300;
    height:300;
`;

const LogoContainer = styled.View`
    align-items: center;
    border-color: transparent;
`;


export default class Question extends React.Component {
    static defaultProps = {
        interval: 5000,
    };

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = { 
            timer : this.props.interval/1000, 
            question : this.props.navigation.state.params.question,
            solution : this.props.navigation.state.params.solution,
            level : this.props.navigation.state.params.level,
            resetLevel : this.props.navigation.state.params.resetLevel,
            increaseLevel : this.props.navigation.state.params.increaseLevel,};
    }

    goToQuestion() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                NavigationActions.navigate({ routeName: 'Field', 
                    params:{
                        question : this.props.navigation.state.params.question,
                        solution : this.props.navigation.state.params.solution,
                        level : this.props.navigation.state.params.level,
                    }}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleBackButton() {
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const timerz = setTimeout(() => this.goToQuestion(), this.props.interval);
        const timer2 = setInterval(() => {
            this.setState(previousState => {
              return { timer: previousState.timer - 1 };
            });
          }, 1000);
        const question = this.props.navigation.state.params.question;
        const solution = this.props.navigation.state.params.solution;
        const level = this.props.navigation.state.params.level;
        const resetLevel = this.props.navigation.state.params.resetLevel;
        const increaseLevel = this.props.navigation.state.params.increaseLevel;
        this.setState({ timerz, timer2, question, solution, level, resetLevel, increaseLevel });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        const { timerz, timer2 } = this.state;
        if (timerz) { clearInterval(timerz); }
        if (timer2) { clearInterval(timer2); }
    }

      render() { 
        return (
            <Container>
                <BackgroundContainer>
                    <BackdropImage source = {require('../assets/img/background.jpg')} resizeMode = 'cover'/>
                </BackgroundContainer>
                <Overlay>
                    {this.state.question === 'som' && 
                    <LargeText>
                        Welke som is gelijk aan {this.state.solution} ?
                        
                    </LargeText>
                    }
                    {this.state.question === 'deling' && 
                    <LargeText>
                        Welk getal is deelbaar door {this.state.solution} ?    
                    </LargeText>
                    }
                    {this.state.question !== 'deling' && this.state.question !== 'som' &&
                    <LargeText>
                        Voorlopig gaat er iets mis.
                    </LargeText>
                    }
                    <Timer>
                        Spel start in: {this.state.timer}
                    </Timer>
                    <LogoContainer>
                        <Logo resizeMode='contain' source = {require('../assets/img/touch.gif')} />
                    </LogoContainer>
                </Overlay>
            </Container>
        );
      }
    }

    