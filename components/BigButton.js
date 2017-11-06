import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'apsl-react-native-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class BigButton extends React.Component {
    render() {
        return (
            <Button style={this.props.style}>
                <MaterialCommunityIcons
                    onPress={this.props.onPress}
                    name={this.props.icon}
                    size={this.props.size}
                    color={this.props.color}/>
            </Button>
        );
    }
}
