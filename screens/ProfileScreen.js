import React from 'react';
import styled from 'styled-components/native'
import {StyleSheet, View, Text, Image} from 'react-native';

const BorderBox = styled.View`
    flex:2;
    background-color: white;
    justify-content: center;
    border-color: #34495e;
    border-width: 3px;
    border-style: solid;
`;

const BottomBox = styled.View`
    flex:2;
    background-color: white;
    border-color: #34495e;
    border-width: 3px;
    border-style: solid;
`;

const MiniBox = styled.View`
    flex:1;
    background-color: white;
    border-color: #34495e;
    border-width: 3px;
    border-style: solid;
`;

export default class ProfileScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;
        return(
            <View style = {styles.container}>
                <View style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'center'}}>
                    <View style= {{ flex:1}}>
                        {/* TODO: path is niet dynamisch! */}
                        <Image style={{resizeMode:Image.resizeMode.contain}} source={require('../assets/img.png')}/>
                    </View>
                    <View style= {{ flex:1, justifyContent: 'center', backgroundColor: 'white'}}>
                        <Text style={styles.textLarge}>
                            {this.props.navigation.state.params.user}
                        </Text>
                    </View>
                </View>
                <View style={{
                        flex: 1,
                        flexDirection: 'row'}}>
                    <BorderBox>
                        <Text style={styles.textLarge}>
                            {this.props.navigation.state.params.playerstatus}
                        </Text>
                    </BorderBox>
                    <BorderBox>
                        <Text style={styles.textLarge}>
                            Achievements
                        </Text>
                    </BorderBox>
                </View>

                <BottomBox/>
                <BottomBox/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    textLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
});
