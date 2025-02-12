import React from 'react';
import * as firebase from 'firebase';
import Grid from '../components/Grid';
import BottomTimer from '../components/BottomTimer';

import { Audio } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Text, View, BackHandler } from 'react-native';
import { QuestionText, RestText, Container, InfoText, InfoContainer, QuestionContainer, Header, Field } from './PlayingFieldStyles';

const PARTS = 40;
const sound = new Audio.Sound();
const firstPlay = true;

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
            filled: PARTS
        };
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const params = this.props.navigation.state.params;
        this.playBackground(true);

        const question = params.question;
        const solution = params.solution;
        const level = params.level;
        const score = params.score;
        const uid = params.uid;
        const gamekey = params.gamekey;
        const gametype = params.gametype;
        this.setState({ question, solution, level, score, uid, gamekey, gametype });

        const sliderTimer = setInterval(() => this.setState({ filled: this.state.filled - 1 }), (this.state.interval * 0.9) / PARTS);
        const timer = setInterval(() => this.nextRow(), this.state.interval);

        this.setState({ timer, sliderTimer });
    }

    componentWillUnmount() {
        const { timer, sliderTimer } = this.state;
        if (timer) { clearInterval(timer); }
        if (sliderTimer) { clearInterval(sliderTimer); }
        this.playBackground(false);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.setState({ interval: this.props.navigation.state.params.interval });
    }

    handleClick(correct, row, selected) {
        this.setState({ correct, row, selected });
    }

    rowHasTrue(row) {
        let hasTrue = false;
        for (let i = 0; i < row.length; i++) {
            if (row[i].correct === true) {
                hasTrue = true;
            }
        }
        return hasTrue;
    }

    getCorrectString(row) {
        let answer = ' ';
        for (let i = 0; i < row.length; i++) {
            if (row[i].correct === true) {
                answer = row[i].string;
            }
        }
        return answer;
    }

    getFeedbackOnError(row, selected) {
        if(this.getCorrectString(row) === ' '){
            return 'Op deze rij was er geen juist antwoord.\nJij duidde ' + selected + ' aan.';
        }
        else{
            if(selected === "leeg") {
                return this.getCorrectString(row) + ' was het juiste antwoord.\nJij duidde (foutief) een leeg vakje aan.';
            }
            else if(!!selected) {
                return this.getCorrectString(row) + ' was het juiste antwoord.\nJij duidde ' + selected + ' aan.';
            }
            else {
                return this.getCorrectString(row) + ' was het juiste antwoord.\nJij duidde (foutief) niets aan.';
            }
        }
    }

    resetNavigatorToMenu(dispatch = true, user_id, game_type) {
        const reset = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu', params: { uid: user_id, gametype: game_type } }),
            ]
        });
        if (dispatch)
            this.props.navigation.dispatch(reset);
        else
            return reset;
    }
    resetNavigatorToGameResult(whereTo, parameters = undefined) { 
        if (!!this.state.uid) {
            const update = {
                end_time: new Date().toTimeString(),
                level_length: this.state.data.length - 1,
                remaining_rows: this.state.currentRow - 1,
                result: whereTo,
                end_score: parameters.score,
                interrupted: false
            };
            if(whereTo === "GameOver" && (this.state.correct === false || this.state.correct === undefined)) {
                const correctString = this.getCorrectString(this.state.data[this.state.currentRow - 1]);
                update.error = { 
                    correct : correctString === ' ' ? "niets" : correctString,
                    selected  : !!this.state.selected ? this.state.selected : "niets"
                };
            }
            this.state.gamekey.update(update);
        }

        const reset = NavigationActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                NavigationActions.navigate({ routeName: whereTo, params: parameters }),
            ]
        });
        this.props.navigation.dispatch(reset);
    }

    async playBackground(play) {
        if (firstPlay) {
            const source = require('../assets/music/766948_Wandering_Edit.mp3');
            await Audio.setIsEnabledAsync(true);
            await sound.loadAsync(source);
            await sound.setIsLoopingAsync(true);
            firstPlay = false;
        }
        if (play) {
            try {
                await sound.playAsync();
            } catch (error) {
                console.error(error);
            }
        }
        if (!play) {
            try {
                await sound.stopAsync();
            } catch (error) {
                console.error(error);
            }
        }
    }

    nextRow() {
        const correct = require('../assets/sounds/Correct_1.wav');
        const incorrect = require('../assets/sounds/Incorrect_1.wav');
        const { timer, sliderTimer } = this.state;
        // 1. GEEN ANTWOORD GESELECTEERD
        if (this.state.correct === undefined) {
            // 1.1 ER IS INDERDAAD GEEN JUIST ANTWOORD
            if (!this.rowHasTrue(this.state.data[this.state.currentRow - 1]))  {
                this.state.score = this.state.score + 1;
                // 1.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if (this.state.currentRow === 1) {
                    if (timer) { clearInterval(timer); }
                    if (sliderTimer) { clearInterval(sliderTimer); }
                    this.playBackground(false);
                    this.resetNavigatorToGameResult('Won', { level: this.state.level + 1, score: this.state.score + 10, uid: this.state.uid, gametype: this.state.gametype });
                }
                // 1.1.2 DIT IS NIET DE LAATSTE RIJ => RIJ OPSCHUIVEN
                else {
                    this.setState({ currentRow: this.state.currentRow - 1, correct: undefined });
                }
            }
            // 1.2 ER WAS WEL EEN JUIST ANTWOORD => GAME OVER
            else  {
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.playBackground(false);
                this.resetNavigatorToGameResult('GameOver', { level: this.state.level, score: this.state.score - this.state.level * 2, uid: this.state.uid, gametype: this.state.gametype, failtext: this.getFeedbackOnError(this.state.data[this.state.currentRow - 1], this.state.selected) });
            }
        }

        // 2. WEL EEN ANTWOORD GESELECTEERD
        else  {
            // 2.1 HET GESELECTEERDE ANTWOORD IS JUIST
            if (this.state.correct === true) {
                this.state.score = this.state.score + 1;
                // 2.1.1 DIT IS DE LAATSTE RIJ => SPEL GEWONNEN
                if (this.state.currentRow === 1) {
                    if (timer) { clearInterval(timer); }
                    if (sliderTimer) { clearInterval(sliderTimer); }
                    this.playBackground(false);
                    this.resetNavigatorToGameResult('Won', { level: this.state.level + 1, score: this.state.score + 10, uid: this.state.uid, gametype: this.state.gametype });
                }
                // 2.1.2 DIT IS NIET DE LAATSTE RIJ => RIJ OPSCHUIVEN
                else {
                    this.setState({
                        currentRow: this.state.currentRow - 1,
                        correct: undefined
                    });
                }
            }
            // 2.2 HET GESELECTEERDE ANTWOORD IS FOUT
            else {
                if (timer) { clearInterval(timer); }
                if (sliderTimer) { clearInterval(sliderTimer); }
                this.playBackground(false);
                this.resetNavigatorToGameResult('GameOver', { level: this.state.level, score: this.state.score - this.state.level * 2, uid: this.state.uid, gametype: this.state.gametype, failtext: this.getFeedbackOnError(this.state.data[this.state.currentRow - 1], this.state.selected)});
            }

        }
        this.setState({ filled: PARTS, selected: undefined });
    }

    handleBackButton() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        const resetAction = this.resetNavigatorToMenu(false, this.state.uid, this.state.gametype);
        if (!!this.state.uid) {
            firebase.database().ref().child('users/' + this.state.uid + '/games/' + this.state.gamekey).update({
                interrupted: true,
                end_time: new Date().toTimeString(),
                level_length: this.state.data.length - 1,
                last_row: this.state.date.currentRow,
                result: "interrupted"
            });
        }

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
                                Resterend: {this.state.currentRow}/{this.state.data.length - 1}
                            </RestText>
                        </InfoText>
                        <InfoText>
                            <RestText>
                                Score: {this.state.score}
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
                    <Grid data={this.state.data} currentRow={this.state.currentRow} solution={this.state.solution} onClick={(number, row, selected) => this.handleClick(number, row, selected)} />
                </Field>
                <BottomTimer total={PARTS} filled={this.state.filled} />
            </Container>
        );
    }
}
