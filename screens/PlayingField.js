import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from 'apsl-react-native-button';
import Grid from '../components/Grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

export default class PlayingField extends React.Component {

    constructor(props) {
        super(props);

        this.state = { currentRow: NUMBERS.length - 1, number: undefined }
    }

    handleClick(number) {
        this.setState({number});
    }

    nextRow() {
        if(this.state.number == 3)
            console.log("YAY")
        else
            console.log("GE SUCKT BALLZ")
        this.setState({
            currentRow: this.state.currentRow - 1,
            number: undefined
        });
    }

    componentDidMount() {
        setInterval(() => this.nextRow(), 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.question}>
                        <Text>
                            How much is this + this, ey?
                        </Text>
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
        borderColor: '#34495e',
        borderRadius: 0,
        borderWidth: 3
    },
    header: {
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
