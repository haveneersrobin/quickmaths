import React from 'react';
import Grid from '../components/Grid';
import Button from 'apsl-react-native-button';
import BottomTimer from '../components/BottomTimer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationActions } from 'react-navigation';
import { createSumGrid, createModuloGrid } from '../util/GridGenerator';
import { QuestionText, RestText, Container, InfoText, InfoContainer, QuestionContainer, Header, Field } from './PlayingFieldStyles';
import { StyleSheet, Text, View, Dimensions, BackHandler } from 'react-native';

import { Audio } from 'expo';

const PARTS = 20;

export default class PlayingField extends React.Component {
    static defaultProps = {
        solution: 7,
        level: 1,
    };

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params;
        
        let data = params.data;
        
        this.state = { 
            currentRow: data.length - 1,
            data: data,
            filled: PARTS};
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const params = this.props.navigation.state.params;

        const question = params.question;
        const solution = params.solution;
        const level = params.level;
        this.setState({question, solution, level });
        
        const sliderTimer = setInterval(() => this.setState({ filled: this.state.filled - 1 }), (this.state.interval *0.9) / PARTS);
        const timer = setInterval(() => this.nextRow(), this.state.interval);
        
        // DEBUG TIMERS
        //const sliderTimer = setInterval(() => this.setState({ filled: this.state.filled - 1 }), (150000 *0.9) / PARTS);
        //const timer = setInterval(() => this.nextRow(), 150000);
        this.setState({ timer, sliderTimer });
    }

    componentWillUnmount() {
        const { timer, sliderTimer } = this.state;
        if (timer) { clearInterval(timer); }
        if (sliderTimer) { clearInterval(sliderTimer); }
    }

    
    componentWillMount() {
        this.setState({ interval: this.props.navigation.state.params.interval });
    }
    
    handleClick(correct, row) {
        this.setState({ correct, row });
    }

    rowHasTrue(row) {
        let hasTrue = false;
        for(let i = 0; i < row.length; i++) {
            if(row[i].correct === true) {
                hasTrue = true;
            }
        }
        return hasTrue;
    }

    resetNavigatorToMenu(dispatch = true) {
        const reset =  NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
            ]
        });
        if(dispatch)
            this.props.navigation.dispatch(reset);
        else
            return reset;
    }

    resetNavigatorToGameResult(whereTo, parameters = undefined) {
        const reset =  NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                NavigationActions.navigate({ routeName: whereTo, params:parameters }),
            ]
        });
        this.props.navigation.dispatch(reset);
    }

    async playSound(correct) {
        const source = correct ? require('../assets/sounds/Correct_1.wav') : require('../assets/sounds/Incorrect_1.wav');
        try {
          await Audio.setIsEnabledAsync(true);
          const sound = new Audio.Sound();
          await sound.loadAsync(source);
          await sound.playAsync(); 
        } catch(error) {
          console.error(error);
        }
      }

    nextRow() {
        const correct = require('../assets/sounds/Correct_1.wav');
        const incorrect = require('../assets/sounds/Incorrect_1.wav');
        const { timer, sliderTimer } = this.state;
        console.log("CORRECT " + this.state.correct)
        // 1. GEEN ANTWOORD GESELECTEERD
        if(this.state.correct === undefined) {
            // 1.1 ER IS INDERDAAD GEEN JUIST ANTWOORD
            this.playSound(true);
            if(!this.rowHasTrue(this.state.data[this.state.currentRow - 1])) {
                // 1.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if(this.state.currentRow === 1) {
                    if (timer) { clearInterval(timer); }
                    if (sliderTimer) { clearInterval(sliderTimer); }
                    this.resetNavigatorToGameResult('Won', {level:this.state.level+1});
                }
                // 1.1.2 DIT IS NIET DE LAATSTE RIJ => RIJ OPSCHUIVEN
                else {
                    this.setState({ currentRow: this.state.currentRow - 1, correct:undefined});
                }
            }
            // 1.2 ER WAS WEL EEN JUIST ANTWOORD => GAME OVER
            else {
                this.playSound(false);
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.resetNavigatorToGameResult('GameOver', {level:this.state.level});
            }
        }

        // 2. WEL EEN ANTWOORD GESELECTEERD
        else {
            // 2.1 HET GESELECTEERDE ANTWOORD IS JUIST
            if (this.state.correct === true) {
                
                this.playSound(true);   
                // 2.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if(this.state.currentRow === 1) {
                    if (timer) { clearInterval(timer); }
                    if (sliderTimer) { clearInterval(sliderTimer); }
                    this.resetNavigatorToGameResult('Won', {level:this.state.level+1});
                }
                // 2.1.2 DIT IS NIET DE LAATSTE RIJ => RIJ OPSCHUIVEN
                else {
                    this.setState({
                        currentRow: this.state.currentRow - 1,
                        correct:undefined
                    });
                }
            }
            // 2.2 HET GESELECTEERDE ANTWOORD IS FOUT
            else {
                
                this.playSound(false);
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.resetNavigatorToGameResult('GameOver', {level:this.state.level});
            }

        }
        this.setState({ filled: PARTS });
    }

    handleBackButton() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);  
        const resetAction = this.resetNavigatorToMenu(false);       
        const { timer, sliderTimer } = this.state;
        if (timer) { clearInterval(timer); }
        if (sliderTimer) { clearInterval(sliderTimer); }
        this.props.navigation.dispatch(resetAction);
        return true;
    }

    render() {
        return (
            <Container>
                <Header>
                    <QuestionContainer elevation={5} >
                        <QuestionText>
                             {this.state.question}
                        </QuestionText>
                    </QuestionContainer>
                    <InfoContainer>
                        <InfoText>
                            <RestText>
                                Resterend: {this.state.currentRow}/{this.state.data.length-1}
                            </RestText>
                        </InfoText>
                        <InfoText>
                            <RestText>
                                Level: {this.state.level}
                            </RestText>
                        </InfoText>
                    </InfoContainer>
                </Header>
                <Field>
                    <Grid data={this.state.data} currentRow={this.state.currentRow} solution={this.state.solution} onClick={(number) => this.handleClick(number)} />
                </Field>
                <BottomTimer total={PARTS} filled={this.state.filled}/>
            </Container>
        );
    }
}
