import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image, BackHandler, Animated} from 'react-native';
import ImgButton from '../components/ImageButton';
import styled from 'styled-components/native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
    font-size: ${() => Number(responsiveFontSize(8))};
    text-align: center;
    padding: ${() => parseInt(responsiveHeight(2),10)}px;
`;

const Timer = styled.Text`
    margin-top: ${() => Number(responsiveHeight(3))};
    font-family: 'proxima';
    font-size: ${() => Number(responsiveFontSize(3))};
    text-align: center;
    color:#A1C1B9;
`;

const Logo = styled.Image`
    margin-top:40;
    backgroundColor: transparent;
    align-items: center;
    height: ${() => Number(responsiveHeight(30))};
`;

const LogoContainer = styled.View`
    align-items: center;
    border-color: transparent;
`;

const LargeTextContainer = styled.View`
    background-color:#E1E2E1;
    margin: ${() => parseInt(responsiveHeight(3),10)}px;
    margin-top: -${() => parseInt(responsiveHeight(15),10)}px;
`;

const SmallText = styled.Text`
    font-size: ${() => Number(responsiveFontSize(3))};
    font-family: 'roboto';
    color: #214868;
    text-align: center;
    padding-top: ${() => parseInt(responsiveHeight(2),10)}px;
`;



export default class Question extends React.Component {
    static defaultProps = {
        interval: 6000,
    };

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = { timer : this.props.interval/1000 };
    }


    randomQuestion(question, level) {
        const solution = _.random(this.getLower(level, question),this.getUpper(level, question));
        this.setState({ solution });
    }
    
    getUpper(level, question) {
        if(question === 'som') {
            return _.random(Math.pow(level+2, 2),Math.pow(level+7, 2));
        }
        else if(question === 'deling') {
            return _.random(level*2,level*3);
        }
    }
    
    getLower(level, question) {
        if(question === 'som') {
            return _.random(Math.pow(level, 2),Math.pow(level+5, 2));
    }
    else if(question === 'deling') {
        return _.random(level+1,level+2);
    }
  }

    goToQuestion() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        console.log(this.state.question, this.state.solution, this.state.level);
        const resetAction = NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                NavigationActions.navigate({ routeName: 'Field', 
                    params:{
                        question : this.state.question,
                        solution : this.state.solution,
                        level : this.state.level
                    }}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    handleBackButton() {
        return true;
    }

    componentWillMount() {
        const level = this.props.navigation.state.params.level;
        const type = 0;
        //const type = _.random(0,1);
        let question;
        if(type === 0) {
            question = 'som';
        }
        else if (type === 1) {
            question =  'deling';
        }
        this.setState({ question, level }, this.randomQuestion(question, level));
        
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const timerz = setTimeout(() => this.goToQuestion(), this.props.interval);
        const timer2 = setInterval(() => {
            this.setState(previousState => {
              return { timer: previousState.timer - 1 };
            });
          }, 1000);
        this.setState({ timerz, timer2 });
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
                    <LargeTextContainer elevation={3}>
                            <SmallText>
                                Level: {this.state.level}
                            </SmallText>
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
                    </LargeTextContainer>
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

    