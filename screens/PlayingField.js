import React from 'react';
import Grid from '../components/Grid';
import Button from 'apsl-react-native-button';
import BottomTimer from '../components/BottomTimer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationActions } from 'react-navigation';
import { createSumGrid, createModuloGrid } from '../util/GridGenerator';
import { QuestionText, RestText, Container, InfoText, InfoContainer, QuestionContainer, Header, Field } from './PlayingFieldStyles';
import { StyleSheet, Text, View, Dimensions, BackHandler } from 'react-native';


const PARTS = 20;

export default class PlayingField extends React.Component {
    static defaultProps = {
        interval:4000,
        solution: 7,
        level: 1
    };

    constructor(props) {
        super(props);
        let data = [];
        const params = this.props.navigation.state.params;
        console.log("PARAMS " + JSON.stringify(params));

        if(params.question === 'som') {
            console.log("SOM");
            data = createSumGrid(params.solution, params.level*8, params.level*5, nbCols = 3).grid;
        }
        else if(params.question === 'deling') {
            console.log("DELING");
            data = createModuloGrid(params.solution, params.level*8, params.level*5, nbCols = 3).grid;
        }

        console.log("DATA= " + JSON.stringify(data));
        
        this.state = { 
            currentRow: data.length - 1,
            data: data,
            timer : this.props.interval/1000,
            filled: PARTS};
        this.handleBackButton = this.handleBackButton.bind(this);
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

    nextRow() {
        const { timer, sliderTimer } = this.state;
        console.log("CORRECT " + this.state.correct)
        // 1. GEEN ANTWOORD GESELECTEERD
        if(this.state.correct === undefined) {
            // 1.1 ER IS INDERDAAD GEEN JUIST ANTWOORD
            if(!this.rowHasTrue(this.state.data[this.state.currentRow])) {
                // 1.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if(this.state.currentRow === 0) {
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
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.resetNavigatorToGameResult('GameOver', {level:this.state.level});
            }
        }

        // 2. WEL EEN ANTWOORD GESELECTEERD
        else {
            // 2.1 HET GESELECTEERDE ANTWOORD IS JUIST
            if (this.state.correct === true) {
                // 2.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if(this.state.currentRow === 0) {
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
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.resetNavigatorToGameResult('GameOver', {level:this.state.level});
            }

        }
        this.setState({ filled: PARTS });
    }

    handleBackButton() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);  
        const resetAction = this.esetNavigatorToMenu(false);       
        const { timer, sliderTimer } = this.state;
        if (timer) { clearInterval(timer); }
        if (sliderTimer) { clearInterval(sliderTimer); }
        this.props.navigation.dispatch(resetAction);
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const question = this.props.navigation.state.params.question;
        const solution = this.props.navigation.state.params.solution;
        const level = this.props.navigation.state.params.level;
        this.setState({question, solution, level });
        
        const sliderTimer = setInterval(() => this.setState({ filled: this.state.filled - 1 }), (this.props.interval *0.9) / PARTS);
        const timer = setInterval(() => this.nextRow(), this.props.interval);
        this.setState({ timer, sliderTimer });
    }

    componentWillUnmount() {
        const { timer, sliderTimer } = this.state;
        if (timer) { clearInterval(timer); }
        if (sliderTimer) { clearInterval(sliderTimer); }
    }

    render() {
        return (
            <Container>
                <Header>
                    <QuestionContainer elevation={5} >
                        {this.state.question === 'som' && 
                        <QuestionText>
                            Welke som is gelijk aan {this.state.solution} ?
                        </QuestionText>
                        }
                        {this.state.question === 'deling' && 
                        <QuestionText>
                            Welk getal is deelbaar door {this.state.solution} ?
                        </QuestionText>
                        }
                        {this.state.question !== 'som' && this.state.question !== 'deling' &&
                        <QuestionText>
                            Voorlopig gaat er iets mis.
                        </QuestionText>
                        }
                    </QuestionContainer>
                    <InfoContainer>
                        <InfoText>
                            <RestText>
                                Resterend: {this.state.currentRow+1}/{this.state.data.length}
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
