import _ from 'lodash';
import React from 'react';
import * as firebase from 'firebase';
import styled from 'styled-components/native';
import ImgButton from '../components/ImageButton';

import { Audio } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Text, View, Image, BackHandler} from 'react-native';
import { getRandomGridByGameType } from '../util/GridGenerator';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';


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
    font-size: ${() => Number(responsiveFontSize(4))};
    text-align: center;
    padding: ${() => parseInt(responsiveHeight(2),10)}px;
`;

const Timer = styled.Text`
    margin-top: ${() => Number(responsiveHeight(3))};
    font-family: 'proxima';
    font-size: ${() => Number(responsiveFontSize(3))};
    text-align: center;
    color:#ffca3b;
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
    font-size: ${() => Number(responsiveFontSize(2))};
    font-family: 'roboto';
    color: #214868;
    text-align: center;
    padding-top: ${() => parseInt(responsiveHeight(2),10)}px;
`;



export default class Question extends React.Component {
    static defaultProps = {
        questionInterval: 5000,
    };

    constructor(props) {
        super(props);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.state = { timer : this.props.questionInterval/1000 };
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
                        question : this.state.question,
                        solution : this.state.solution,
                        level : this.state.level,
                        interval : this.state.fieldInterval,
                        data: this.state.grid,
                        score: this.state.score,
                        gamekey: this.state.gamekey,
                        uid: this.state.uid,
                        gametype: this.state.gametype,
                    }}),
            ]
        });
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        this.props.navigation.dispatch(resetAction);
    }

    handleBackButton() {
        return true;
    }

    startNewGame(userId, current_level, current_score, current_question, current_solution, current_interval, game_data, gametype) {
        firebase.database().ref('users/' + userId + '/nb_games_played').transaction((currentGamesPlayed) => {
            return (currentGamesPlayed || 0) + 1;
        });
        const start = new Date().toTimeString();
        // A post entry.
        const gameData = {
            type: gametype == 0 ? "Classic" : "Endurance",
            start_time: start,
            end_time: 0,
            level: current_level,
            end_score: current_score,
            question: current_question,
            solution: current_solution,
            interval: current_interval,
            result: "",
            remaining_rows: -1,
            level_length: 0,
            interrupted: true,
            grid:game_data,

        };

        // Get a key for a new Post.
        const newGameKey = firebase.database().ref().child('users/' + userId + '/games/').push();
        this.setState( { gamekey:   newGameKey });
        newGameKey.set(gameData);
      }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const nav_props = this.props.navigation.state.params;
        const gametype = nav_props.gametype;
        const level = nav_props.level;
        const score = nav_props.score;
        const uid = nav_props.uid;
        const data = getRandomGridByGameType(gametype, level); // level meegegen is genoeg, al de rest bepaald de generator. Lengte hangt af van het level -> zie functie in generator
        // TODO: Interval fixen
        const fieldInterval = 5000;
        console.log("PROPERTIES");
        console.log(level);
        console.log(score);
        console.log(uid);
        console.log(JSON.stringify(data, null, 4));
        console.log("END PROPERTIES");
        if(!!uid) {
            this.startNewGame(uid, level, score, data.objective, data.numericSolution, fieldInterval, data.grid, gametype);
        }
        this.setState({ 
            question : data.objective,
            solution: data.numericSolution,
            grid : data.grid,
            level: level, 
            fieldInterval : fieldInterval,
            score: score,
            uid: uid,
            gametype: gametype
        });
        
    }

    componentDidMount() {
        const timerz = setTimeout(() => this.goToQuestion(), this.props.questionInterval);
        const timer2 = setInterval(() => {
            this.setState(previousState => {
              return { timer: previousState.timer - 1 };
            });
          }, 1000);
        this.setState({ timerz, timer2 });
        this.playSound();
    }
    componentWillUnmount() {
        const { timerz, timer2 } = this.state;
        if (timerz) { clearInterval(timerz); }
        if (timer2) { clearInterval(timer2); }
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    async playSound() {
        const source = require('../assets/sounds/Countdown_1.wav');
        try {
          await Audio.setIsEnabledAsync(true);
          const sound = new Audio.Sound();
          await sound.loadAsync(source);
          await sound.playAsync(); 
        } catch(error) {
          console.error(error);
        }
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
                        <LargeText>
                            {this.state.question}
                        </LargeText>
                    </LargeTextContainer>
                    <Timer>
                        Spel start in: {this.state.timer}
                    </Timer>
                    {/* <LogoContainer>
                        <Logo resizeMode='contain' source = {require('../assets/img/touch.gif')} />
                    </LogoContainer> */}
                </Overlay>
            </Container>
        );
      }
    }

    