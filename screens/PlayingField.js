import React from 'react';
import {StyleSheet, Text, View, Dimensions, BackHandler} from 'react-native';
import Button from 'apsl-react-native-button';
import Grid from '../components/Grid';
import { NavigationActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const NUMBERS = [
    [
        1, 2, 3
    ],
    [
        4, 6, 7
    ],
    [
        8,"", 0
    ],
    [
        10, 3, 1
    ],
    [
        3, 1,""
    ],
    [
        0, 1, 3
    ],
    [
        1, 2, 3
    ],
    [
        4, 6, 7
    ],
    [
        8, 9, 0
    ],
    [
        10, 3, 1
    ],
    [
        3, 1, 2
    ],
    [0, 1, 3]
];

const QuestionText = styled.Text`
    font-family: 'proxima';
    text-align:center;
    font-size: 30;
    color: #2A435C;
`;

export default class PlayingField extends React.Component {
    static defaultProps = {
        interval: 3000,
        checker: number => number % 3 === 0,
        questionText: "Welk getal is deelbaar door 3?"
    };

    constructor(props) {
        super(props);
        this.state = { currentRow: NUMBERS.length - 1, number: undefined};
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    handleClick(number) {
        this.setState({number});
    }

    nextRow() {
        const { checker } = this.props;
        const { number, timer } = this.state;
        if (checker(number)) {
            console.log(number);
            console.log("Correct");
            this.setState({
                currentRow: this.state.currentRow - 1,
                number: undefined,
            });
        }
        else {
            console.log("GE SUCKT BALLZ")
            if (timer) { clearInterval(timer); }
            const resetAction = NavigationActions.reset({
                index: 2,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'Menu' }),
                    NavigationActions.navigate({ routeName: 'GameOver' }),
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    handleBackButton() {
        console.log("back button pressed");
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Menu' }),
                // Here put ge uw lost screen
            ]
        });
        const { timer } = this.state;
        if (timer) { clearInterval(timer); }
        this.props.navigation.dispatch(resetAction);
        return true;
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const timer = setInterval(() => this.nextRow(), this.props.interval);
        this.setState({ timer });
    }
    
    componentWillUnMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);        
        const { timer } = this.state;
        if (timer) { clearInterval(timer); }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.question}>
                        <QuestionText>
                            {this.props.questionText}
                        </QuestionText>
                    </View>
                    <View style={styles.rest}>
                        <View style={styles.aux}>
                            <Text>
                                03:14
                            </Text>
                        </View>
                        <View style={styles.aux}>
                            <Text>
                                Level 1
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.field}>
                    <Grid currentRow={this.state.currentRow} data={NUMBERS} onClick={(number) => this.handleClick(number)}/>
                </View>
                <View style={styles.end}>
                    <MaterialCommunityIcons name={"pause"} size={30} color={"#e67e22"}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    aux: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#34495e',
        borderRadius: 0,
        borderWidth: 3
    },

    rest: {
        flex: 3
    },

    question: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
        backgroundColor:'#EAEAEC',
        borderColor: '#34495e',
        borderRadius: 0,
        borderWidth: 3
    },
    header: {

        fontFamily: 'proxima',
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#95a5a6'
    },
    field: {
        flex: 10,
        backgroundColor: 'white'
    },
    end: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#e74c3c'
    }
});
